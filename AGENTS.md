# AI Coding Agents Guide — PalletTimeLine

This is a **Spec-Driven Development** project: designs in `prototype/` → React UI → .NET API.

## Quick Start

### What Is This?
Internal festival organization tool (Festival 2025, Aug 8–9). Four sections: Overview (KPIs), Tasks (Gantt chart), Costs/Revenue (budgets + charts), Warehouse (inventory by location).

### Read These First
- [Claude.md](Claude.md) — **Primary handoff instructions** (Polish). Tech stack, project scope, code quality guidelines.
- [DESIGN_SPEC.md](prototype/DESIGN_SPEC.md) — Complete UI specification with schema and i18n strings.
- [prototype/PalletTimeLine.html](prototype/PalletTimeLine.html) — Visual reference (read the HTML, don't screenshot).

### Tech Stack at a Glance
| Layer | Tech |
|-------|------|
| **API** | .NET 10, ASP.NET Core, EF Core 9 + PostgreSQL |
| **UI** | React 18 + Vite 5, plain CSS (no Tailwind) |
| **Prototype** | HTML/CSS/JS reference design |

---

## Architecture & File Locations

### API (`API/`)
**What:** ASP.NET Core backend serving JSON.

| File | Purpose |
|------|---------|
| [Program.cs](API/PalletTimeLine.Api/Program.cs) | DI, middleware, DbContext setup |
| `Controllers/` | 5 REST endpoints (Tasks, Overview, Costs, Revenue, Warehouse) |
| `Models/` | Entity definitions (TaskItem, CostItem, WarehouseItem, RevenueItem) |
| `Data/PalletTimelineDbContext.cs` | EF Core context, seed data |
| `DTOs/ApiDtos.cs` | Request/response objects |

**Dev Command:**
```bash
cd API/PalletTimeLine.Api
dotnet run  # https://localhost:5101 (Swagger at /swagger)
```

**Current State:**
- ✅ Read-only endpoints implemented
- ✅ JSONB support for `Who` field (array of names)
- ❌ Validation layer missing (needs FluentValidation)
- ❌ Error handling middleware not implemented
- ❌ Most write operations not built

### UI (`UI/`)
**What:** React components consuming data. Currently disconnected from API (uses local `festival.js` data).

| File | Purpose |
|------|---------|
| [src/main.jsx](UI/src/main.jsx) | Entry point |
| [src/App.jsx](UI/src/App.jsx) | Router + layout wrapper |
| `src/sections/` | Page components: Overview, Tasks, Costs, Warehouse |
| `src/components/` | Reusable: Layout (Sidebar, Topbar), Icons |
| `src/data/festival.js` | **Hardcoded data** (needs API integration) |
| `src/data/utils.js` | Utilities: `fmtPLN()`, `fmtDate()`, `daysToFestival()` |
| [src/styles/globals.css](UI/src/styles/globals.css) | CSS tokens (colors, fonts, spacing—no Tailwind) |

**Dev Command:**
```bash
cd UI
npm install && npm run dev  # http://localhost:3000
```

**Current State:**
- ✅ All 4 sections implemented in React
- ✅ UI matches design mockups
- ❌ Not calling API (reads from `festival.js`)
- ❌ No error handling or loading states

### Prototype (`prototype/`)
**What:** Design reference. Source of truth for UI specs.

| File | Purpose |
|------|---------|
| [PalletTimeLine.html](prototype/PalletTimeLine.html) | Main mockup (read this fully) |
| `*.jsx` | Component templates (costs.jsx, tasks.jsx, etc.) |
| [styles.css](prototype/styles.css) | Design tokens and layout rules |
| [data.js](prototype/data.js) | Mock data structure |
| [DESIGN_SPEC.md](prototype/DESIGN_SPEC.md) | Detailed schema, i18n, recommendations |

---

## Conventions & Patterns

### Language & i18n
- **Primary language:** Polish (PL)
- **Bilingual UI:** Every string keyed in `I18N` object
- **Location:** `UI/src/data/festival.js` (centralized)

### Formatting Utilities (Use These)
```javascript
// From src/data/utils.js
fmtPLN(2500)           // → "2500 zł"
fmtDate("2025-08-08", "PL")  // → "8 sie"
daysToFestival()       // → 64 (current)
initials("Jan Kowalski") // → "JK"
```

### Code Style
- **API:** SOLID principles, clean architecture per [Claude.md](Claude.md)
  - Controllers → Services (if needed) → Models/DTOs
  - Async/await, dependency injection
  - FluentValidation for request validation (not yet implemented)
- **UI:** Functional components, hooks (useState, useMemo, useEffect)
  - Separate concerns: components, data fetching, utilities
  - Plain CSS Modules or global CSS with CSS variables
  - No inline styles unless unavoidable

### Styling
- **CSS:** Plain CSS + variables (tokens in `:root`)
- **No Tailwind** (per design spec)
- **Themes:** Light (default) + dark mode (`data-theme="dark"`)
- **Colors, fonts, spacing:** Defined in [prototype/styles.css](prototype/styles.css)

---

## Development Workflow (Spec-Driven)

### When Adding a Feature:

1. **Check the prototype first** (`prototype/DESIGN_SPEC.md` + `PalletTimeLine.html`)
   - Does it describe the feature?
   - Is there a UI mockup?
2. **Update/verify the React UI** (`UI/src/sections/`)
   - Match the design pixel-perfectly
   - Use existing utilities and CSS tokens
3. **Build/update the API endpoint** (`API/Controllers/` + `Models/`)
   - Define DTOs, validation rules
   - Add FluentValidation if needed (per [Claude.md](Claude.md))
   - Return clean JSON
4. **Connect UI to API** (update `src/sections/` to fetch from `/api/...`)
   - Handle loading/error states
   - Map API response to UI

### Key Rule (from Claude.md)
> If you don't see new changes in `prototype/`, don't modify the UI.

**Why?** The prototype is the contract. If the UI matches it, you're done on the frontend.

---

## API Endpoints Reference

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/overview` | GET | KPIs + summary | ✅ Implemented |
| `/api/tasks` | GET | All tasks | ✅ Implemented |
| `/api/tasks/{id}` | GET | Single task | ✅ Implemented |
| `/api/tasks/{id}/status` | PATCH | Update status | ⚠️ Partial |
| `/api/costs` | GET | All cost items | ✅ Implemented |
| `/api/revenue` | GET | All revenue items | ✅ Implemented |
| `/api/warehouse` | GET | Inventory by location | ✅ Implemented |

---

## Common Tasks for Agents

### Task: Add a New API Endpoint
1. Define a DTO in `DTOs/ApiDtos.cs`
2. Add validation rules (FluentValidation)
3. Create controller method, return `Ok(dto)`
4. Test via Swagger at `/swagger`

### Task: Update a React Section
1. Edit `src/sections/Xyz.jsx`
2. Check CSS tokens in `globals.css` before adding custom styles
3. Verify component uses i18n keys (not hardcoded strings)
4. Test at `http://localhost:3000`

### Task: Connect UI to API
1. Import `fetch()` or similar (no lib added yet; use native)
2. Call `/api/...` endpoint
3. Map response to component state
4. Add loading/error UI states
5. Update from hardcoded `festival.js` data to live API data

### Task: Add/Update Validation
1. Create FluentValidator in `API/` (per Claude.md standards)
2. Apply in controller before saving
3. Return `BadRequest(errors)` with clear messages

---

## Known Gaps & TODOs

| Gap | Severity | Next Steps |
|-----|----------|-----------|
| UI not calling API | 🔴 High | Create fetch integration, replace hardcoded data |
| No validation layer | 🔴 High | Add FluentValidation middleware |
| No error handling middleware | 🟡 Medium | Add global exception handler |
| No write operations (except Tasks status) | 🟡 Medium | Implement POST/PUT/DELETE as needed |
| No tests | 🟡 Medium | Add unit/integration tests |
| No authentication | 🟢 Low | Design mentions NextAuth (defer to Phase 2) |

---

## Debugging Tips

**API not running?**
```bash
dotnet clean && dotnet build
dotnet run
```

**UI not hot-reloading?**
```bash
rm -rf UI/node_modules UI/package-lock.json
npm install && npm run dev
```

**Styles not applying?**
- Check `globals.css` for CSS variable definitions
- Verify class names in JSX match CSS file
- Reload browser (Ctrl+Shift+R)

**API returns 500?**
- Check Swagger at `https://localhost:5101/swagger`
- Look for DbContext errors in console
- Verify PostgreSQL connection string in `appsettings.json`

---

## References

- **Project Handoff:** [Claude.md](Claude.md) (Polish, complete)
- **Design Spec:** [DESIGN_SPEC.md](prototype/DESIGN_SPEC.md)
- **Prototype HTML:** [PalletTimeLine.html](prototype/PalletTimeLine.html)
- **.NET Docs:** https://learn.microsoft.com/en-us/dotnet/
- **React Docs:** https://react.dev
- **EF Core:** https://learn.microsoft.com/en-us/ef/core/

---

**Questions?** Ask the user for clarification on design ambiguities (per Claude.md) before implementing. This keeps development efficient and aligned with the spec.
