# PalletTimeLine — DESIGN_SPEC

> Specyfikacja produktu/UI do implementacji w produkcyjnym stacku (np. Next.js + DB).
> Źródło prawdy: prototyp HTML w tym repo (`PalletTimeLine.html` + `*.jsx` + `styles.css` + `data.js`).
> Język UI: **PL/EN** (PL domyślny). Czytelnik tej specyfikacji: developer (Claude Code) implementujący właściwą aplikację.

---

## 1. Czym jest PalletTimeLine

Wewnętrzne narzędzie dla zespołu organizującego festiwal („Festiwal 2025", 8–9 sierpnia, scena z 300 europalet). Łączy cztery rzeczy:

1. **Przegląd** — KPI + stan przygotowań na jednej karcie.
2. **Zadania** — lista + Gantt 14 dni (z przewijanym oknem).
3. **Koszty/Przychody** — pełen budżet z wykresami.
4. **Magazyn** — inwentarz po lokalizacjach.

Aplikacja jest **operacyjna**, nie marketingowa. Gęsta, mono-akcent, brak ozdobników. Gust: lekki blueprint / monospace nagłówki, czysty papier (light) + ciemny tryb.

---

## 2. Stack referencyjny (rekomendacja)

| Warstwa | Wybór | Uwagi |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR dla pierwszego renderu, RSC dla list |
| Język | TypeScript (strict) | |
| DB | Postgres + Prisma | Schemat w sekcji 9 |
| Auth | NextAuth (Email + OAuth) | RBAC niepotrzebny — jeden zespół |
| State klienta | React (useState/useReducer) + URL params dla filtrów | Tanstack Query do mutacji |
| Stylowanie | CSS Modules + tokens z `:root` | Patrz sekcja 6 — **NIE wprowadzać Tailwinda**, prototyp jest plain CSS i tokens muszą zostać 1:1 |
| i18n | `next-intl` | Klucze i ich treść w sekcji 8 |
| Wykresy | Własne SVG (jak w prototypie) | Recharts/Visx OK, ale styl ma być identyczny |

Prototyp używa React 18 UMD + Babel inline + plain `<script>`. **W produkcji to porzucamy** — zachowujemy strukturę komponentów i CSS.

---

## 3. Struktura aplikacji

```
app/
  layout.tsx              # sidebar + topbar, wrapper
  (sections)/
    page.tsx              # /  → Overview
    tasks/page.tsx        # /tasks
    costs/page.tsx        # /costs
    warehouse/page.tsx    # /warehouse
components/
  ui/                     # Sidebar, Topbar, Avatar, StatusPill, Icons, MultiSelect, Chip
  charts/                 # BarChart, DonutChart, BalanceBar
  tasks/                  # TaskList, TaskRow, GanttToolbar, GanttBoard, DatePopover
  costs/                  # CostTabs, CostTable, CostCharts
  warehouse/              # WarehouseFilters, WarehouseTable
  overview/               # KpiGrid, ProgressBar, UpcomingCard, LocationCard
lib/
  i18n.ts                 # I18N strings
  format.ts               # fmtPLN, fmtDate, parseISO, isoDate, initials
  date.ts                 # TODAY (mock w deve, server time w prod), addDays
  fixtures.ts             # → DB seed
styles/
  globals.css             # tokeny + reset
  *.module.css
prisma/
  schema.prisma
```

---

## 4. Sekcje — funkcjonalność

### 4.1 Overview (`/`)

Cztery KPI w gridzie 4 kolumn (mobile: 2):

| KPI | Treść | Stylizacja |
|---|---|---|
| Zadań wykonanych | `done / total-not-cancelled` + `%` | `kpi--accent` (kolorowy lewy border) |
| W trakcie | `in-progress` count + `X po terminie` | neutralny |
| Przychody | suma PLN + `N pozycji` | `kpi--positive` (zielony border) |
| Bilans | `revenue - costs`, prefix `+`/`-` | `kpi--negative` jeśli ujemny |

Pod KPI **belka postępu** — 4-kolorowy stack (done/in-progress/todo/cancelled), legenda pod spodem z liczbami.

Niżej grid 2 kolumn:
- **Najbliższe zadania** (max 6, posortowane po dacie ≥ TODAY, pomijając done/cancelled) — wiersze: `data | tytuł | avatary`.
- **Magazyn** — bar dla każdej lokalizacji (Misio, Stalowy, Asia/Radek, Konrad), procent = liczba pozycji w lokalizacji / wszystkie.

### 4.2 Tasks (`/tasks`)

**Dwie karty (tabs)**: `Lista zadań` / `Harmonogram`.

#### Filtry (wspólne dla obu widoków)
- Search (po `task` / `taskEn` / `note`).
- MultiSelect Person (z `PEOPLE`).
- MultiSelect Category (z `CATEGORIES`).

Filtry żyją w URL (`?q=...&person=Konrad,Stalowy&cat=build,site`) — share-friendly.

#### Lista
Grupowanie po statusie w kolejności: `in-progress`, `todo`, `done`, `cancelled`. Każda grupa: nagłówek + count.
Wiersz: `[checkbox/status] tytuł (note) | avatars | data | menu`.
Klik w wiersz = toggle done. Klik w `…` = menu (edit/delete — w prototypie placeholder).

Wiersze przeterminowane (`date < TODAY` i status nie `done`/`cancelled`) mają czerwony marker + tekst `po terminie`.

#### Gantt (Harmonogram)
Okno przewijane po dniach. Stan trzymany w `localStorage`:
- `ptl.gantt.step` ∈ {3, 7, 14} — szerokość okna w dniach (default 14).
- `ptl.gantt.start` — ISO daty pierwszego dnia okna (default = `FESTIVAL_START - 5`).

**Toolbar (od lewej)**:
1. `‹` `›` — skok wstecz/w przód o `step` dni.
2. **Segmented** `3d / 7d / 14d` — przełącznik `step`. Zmiana `step` zachowuje **środek okna** (re-center).
3. **Przycisk daty** z ikoną kalendarza, pokazuje zakres np. `28 lip – 10 sie 2025`. Klik → popover-kalendarz.
4. `Dziś` — `windowStart = TODAY - floor(step/2)`. Pulsuje kolumna z TODAY przez ~1.6 s.
5. `Festiwal` — preset: `windowStart = 2025-08-08 - floor(step/2)`. Pulsuje 8.08.

**Popover-kalendarz**:
- Siatka miesiąca (Pn–Ndz), nawigacja `‹ ›` po miesiącach.
- Weekendy stonowane.
- Dni festiwalu (8–9.08) w kolorze akcentu.
- Dziś — obwódka.
- Skróty na stopce: `Dziś`, `Festiwal`.
- Wybór dnia → `windowStart = picked - floor(step/2)`, kolumna z `picked` pulsuje.

**Plansza Ganttu**:
- Header sticky (top), `step` kolumn — każda min `140 px`.
- Body: dla każdego dnia kolumna z gridem; dla każdego wiersza-zadania kafelek umieszczony w komórce dnia, który = `task.date`.
- Kafelek **110 px wysoki**, row pitch **120 px**.
- Tło kafelka według statusu (z tokenami `--status-*-bg`); lewa krawędź 3 px w kolorze statusu.
- Pełna nazwa (bez line-clamp), `text-wrap: pretty`, łamanie długich słów.
- Hover → cień + `translateY(-1px)` + `z-index: 4`.
- Zadania bez daty NIE są w Gantcie (jest osobna sekcja „Bez terminu" pod planszą — opcjonalnie, jak w prototypie).
- Pionowe przewijanie ok; **poziome** też — gdy 14 kolumn × 140 px > szerokość karty, pojawia się pasek (`overflow-x: auto`). Header i body mają tę samą `min-width`, żeby się nie rozjechały.

### 4.3 Costs (`/costs`)

Trzy zakładki: `Przegląd / Koszty / Przychody`.

**Przegląd**:
- Pasek `BalanceBar` — dwie połówki (revenue vs costs) z liczbami i kolorem statusu.
- Grid 2 kolumn: `BarChart` (top wydatki, 8 największych) + `DonutChart` (koszty wg kategorii).

**Koszty / Przychody** (oba mają teraz analogiczne komplety):
- Grid 2 kolumn: top X (BarChart) + by category (DonutChart).
- Pod spodem `CostTable`: `name | amount (PLN, prawy) | category tag | menu`. Stopka tabeli: `Razem` z sumą.

Kategorie kosztów / przychodów — patrz `data.js`. Każda kategoria ma kolor z palety `--chart-1..9` przypisywany deterministycznie (mapowanie po indeksie kategorii w jej grupie).

### 4.4 Warehouse (`/warehouse`)

- **Chips lokalizacji** (multi-toggle): `Wszystkie | Misio (X) | Stalowy (X) | Asia/Radek (X) | Konrad (X)`. Klik = toggle (multi-select). „Wszystkie" = pusta selekcja = pokazuj wszystko.
- Search + MultiSelect Category w drugim rzędzie.
- Po prawej meta: `N pozycji · M szt łącznie`.
- Tabela: `name | qty (mono, prawy) | category tag | location tag | note (truncate, title=note) | menu`.

---

## 5. Komponenty współdzielone

### Sidebar
Stała szerokość 240 px (desktop), w mobile collapse do top sheet.
Brand (logo „P" + tytuł + sub) → `Sections` label → 4 nav itemy → footer z licznikiem `Dni do festiwalu` (duża liczba mono).

### Topbar
`title + sub` po lewej; po prawej rząd: PL/EN toggle, dark/light icon button, `Drukuj`, `Dodaj` (primary) — `Dodaj` ukryty na Overview.

### Avatars
Stos do 3 (z `marginLeft: -5`) + `+N`. Tło avatara: `oklch(0.92 0.04 H)` gdzie `H = (charCode * 7) % 360` — deterministyczny kolor po imieniu. Empty state: avatar `?`.

### StatusPill
Kolorowane pille per status (4 warianty), tekst z i18n.

### MultiSelect (popover)
Dropdown checkboxowy. Trigger pokazuje `label` + `(N)` jeśli coś wybrano. Otwarty popover: lista opcji z checkboxami + przycisk `Wyczyść` na dole. Klik poza zamyka.

### Charts (SVG, własna implementacja)

**BarChart** — pozioma lista wierszy `[label][bar][value mono]`. Bar = `value/max`. Akcent: `--chart-1`. Bez osi, bez gridów.

**DonutChart** — donut SVG (innerRadius ≈ 65%). Środek: total mono. Legenda po prawej: `swatch | label | pct% | amount PLN`.

**BalanceBar** — pozioma belka podzielona proporcjonalnie revenue/costs, etykiety nad belką.

---

## 6. Design tokens (źródło: `styles.css`)

Tokeny **muszą zostać przeniesione 1:1** — to one definiują look. Light mode:

```css
:root {
  --bg: oklch(0.985 0.005 90);
  --surface: oklch(1 0 0);
  --surface-2: oklch(0.965 0.008 90);
  --text: oklch(0.18 0.01 60);
  --text-muted: oklch(0.45 0.01 60);
  --text-dim: oklch(0.62 0.01 60);
  --border: oklch(0.9 0.005 80);

  --accent: oklch(0.55 0.15 265);     /* indigo-blueprint */
  --accent-soft: oklch(0.95 0.04 265);

  --status-todo: oklch(0.7 0.01 60);
  --status-progress: oklch(0.72 0.13 80);   /* amber */
  --status-done: oklch(0.62 0.14 150);      /* green */
  --status-cancelled: oklch(0.6 0.02 30);
  --status-todo-bg: oklch(0.96 0.005 60);
  --status-progress-bg: oklch(0.97 0.04 80);
  --status-done-bg: oklch(0.96 0.04 150);
  --status-cancelled-bg: oklch(0.95 0.005 30);

  --chart-1..9: oklch(...);  /* paleta deterministyczna */

  --radius: 6px;
  --radius-lg: 10px;
  --shadow-sm: 0 1px 2px rgba(20,20,18,.04);
  --shadow:    0 1px 3px rgba(20,20,18,.06), 0 4px 12px rgba(20,20,18,.03);

  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
[data-theme="dark"] { /* override do ciemnego */ }
```

**Reguły użycia**:
- Liczby, daty, KPI, nagłówki tabel, kody → `font-mono`.
- Treść (tytuły zadań, opisy) → `font-sans`.
- Avatary, pille, tagi kategorii → mono.
- Borderr radius: małe elementy (chip, input, button) `--radius`; karty/tabele `--radius-lg`.
- Spacing: gaps 8/10/12/18/20 (gęste). Padding kart: `18px 20px`.
- Ikony 14×14, stroke `1.6`, `currentColor`. NIE używać emoji.

---

## 7. Datamodel (źródło: `data.js`)

### Task
```ts
type TaskStatus = "todo" | "in-progress" | "done" | "cancelled";
type TaskCategory =
  | "site" | "build" | "production" | "catering" | "supplies"
  | "safety" | "promo" | "merch" | "finance" | "admin";

interface Task {
  id: number;
  task: string;        // PL
  taskEn: string;      // EN
  who: string[];       // imiona z PEOPLE
  date: string | null; // ISO YYYY-MM-DD
  status: TaskStatus;
  category: TaskCategory;
  note?: string;
}
```

### Cost / Revenue
```ts
interface Cost   { id: string; name: string; nameEn: string; amount: number; category: string; }
interface Revenue{ id: string; name: string; nameEn: string; amount: number; category: string; }
```

Kategorie:
- Costs: `bands, merch, site, production, catering, supplies, safety, promo, build`
- Revenue: `sponsors, donations, merch`

### WarehouseItem
```ts
interface WarehouseItem {
  id: string;
  name: string; nameEn: string;
  qty: number;
  unit: "szt" | "kpl" | "m";
  location: "Misio" | "Stalowy" | "Asia/Radek" | "Konrad";
  category: "lighting" | "signs" | "banners" | "build" | "supplies" | "safety" | "other";
  note?: string;
}
```

### Stałe
- `FESTIVAL_START = "2025-08-08"`, `FESTIVAL_END = "2025-08-09"`.
- `TODAY` w prototypie zamrożone na `2025-07-22` — w produkcji **`new Date()`** (UTC + Europe/Warsaw dla wyświetlania).
- `PEOPLE`, `LOCATIONS`, `STATUSES`, `CATEGORIES`, `COST_CATEGORIES`, `REVENUE_CATEGORIES`, `WH_CATEGORIES` — enumy do seed/dropdownów.

Dane w `data.js` to **realne fixture** z edycji 2025 — w produkcji wjeżdżają jako seed, ale schema musi być pusta-startowa (dodawanie z UI).

---

## 8. i18n (klucze)

Pełny słownik PL/EN jest w `utils.jsx` → `I18N`. Przeniesienie 1:1 do `messages/pl.json` i `messages/en.json`. Dodatkowe stringi (np. confirmacja delete) — dodawać oba języki naraz, bo PL/EN toggle musi działać natychmiast.

Nazwy tasków/itemów w bazie: dwa pola `name` (PL) i `nameEn` (EN). Prosty wybór po `lang`.

---

## 9. Schemat DB (Prisma)

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  task      String
  taskEn    String
  who       String[] // Postgres array
  date      DateTime? @db.Date
  status    TaskStatus
  category  TaskCategory
  note      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum TaskStatus { todo in_progress done cancelled }
enum TaskCategory { site build production catering supplies safety promo merch finance admin }

model Cost {
  id       String @id @default(cuid())
  name     String
  nameEn   String
  amount   Decimal @db.Decimal(10,2)
  category String  // FK do CostCategory.id
}

model Revenue { /* analogicznie */ }

model WarehouseItem {
  id       String @id @default(cuid())
  name     String
  nameEn   String
  qty      Int
  unit     String     // "szt" | "kpl" | "m"
  location String     // FK do Location.id
  category String     // FK do WhCategory.id
  note     String?
}

// Słowniki — albo enum, albo tabele z (id, pl, en).
// Prototyp używa stałej listy — lekka tabela słownikowa lepsza dla edycji bez deploya.
```

---

## 10. Stany puste / edge'e

- Brak zadań po filtrach: `Brak zadań spełniających filtry`.
- Brak nadchodzących: `—` (en-dash w karcie).
- Zadanie bez `who`: avatar `?` (empty state).
- Zadanie bez `date` w Gantcie: nie pokazuje się; lista pokazuje `—`.
- Bilans ujemny: `kpi--negative` styling, prefix `-`.
- Po terminie: czerwony marker i etykieta `po terminie` / `overdue`.

---

## 11. Drukowanie

`window.print()` z `Topbar`. CSS `@media print`:
- Sidebar i topbar `display: none`.
- Karta na całą szerokość, bez cieni.
- Gantt: `overflow: visible`, header bez sticky.
- Pille i statusy zachowują kolor (`-webkit-print-color-adjust: exact`).

---

## 12. A11y

- Wszystkie buttony bez tekstu (icon-only) mają `aria-label` (theme toggle, menu, scroll arrows).
- Status pill ma `role="status"` z czytelnym tekstem (już ma — to `<span>` z labelem).
- Multiselect popover: `role="listbox"`, opcje `role="option"`, focus trap przy otwarciu.
- Kontrast: tekst-muted vs surface-2 sprawdzony w obu motywach (≥ 4.5:1 dla treści).
- Klawiatura: nawigacja po listach, `Esc` zamyka popovery, `Enter`/`Space` toggluje status zadania.

---

## 13. Czego NIE robić

- Nie dodawać dashboardowego „insightu" / banneru AI.
- Nie wprowadzać emoji do UI (poza ewentualnie awatarami emoji userów — ale to wymaga osobnej decyzji).
- Nie zmieniać palety na bardziej „kolorową" — akcent zostaje jeden (indigo), kolor niesie status, nie dekorację.
- Nie używać Tailwinda, Material UI, shadcn/ui — gust nie pasuje. CSS Modules + tokeny.
- Nie zaokrąglać agresywnie (max `--radius-lg` = 10 px). Fest, nie playful.
- Nie animować nadmiernie. Krótkie tranzycje (≤ 200 ms), poza `pulse` na wybranym dniu Ganttu (1.6 s, raz).

---

## 14. Backlog (poza prototypem)

Prototyp jest demo-only — wszystkie `Add` i `…` pokazują `alert()`. Do zaimplementowania:
- CRUD dla Tasks/Costs/Revenue/Warehouse (modal lub inline edit).
- Bulk import z CSV/Excel (źródło fixtur to Excel).
- Drag-reorder kafelków Ganttu (zmiana daty drag&drop na inny dzień).
- Komentarze pod zadaniami.
- Diff/historia zmian budżetu.
- Eksport do PDF (lepszy niż `window.print`).
- Powiadomienia o terminach (email / slack webhook).

Każdą z tych funkcji uzgodnić z PM przed implementacją — prototyp celowo ich nie ma.

---

## 15. Mapowanie plików prototyp → produkcja

| Prototyp | Produkcja |
|---|---|
| `PalletTimeLine.html` | `app/layout.tsx` + `app/(sections)/page.tsx` |
| `ui.jsx` | `components/ui/*` |
| `tasks.jsx` | `components/tasks/*`, `app/(sections)/tasks/page.tsx` |
| `costs.jsx` | `components/costs/*`, `app/(sections)/costs/page.tsx` |
| `warehouse.jsx` | `components/warehouse/*`, `app/(sections)/warehouse/page.tsx` |
| `overview.jsx` | `components/overview/*`, `app/(sections)/page.tsx` |
| `utils.jsx` | `lib/i18n.ts` + `lib/format.ts` + `lib/date.ts` |
| `data.js` | `prisma/seed.ts` + `prisma/schema.prisma` |
| `styles.css` | `styles/globals.css` (tokens) + `*.module.css` |

---

**Ostatnia uwaga.** Prototyp jest *referencyjny* dla wyglądu i interakcji — pixel-perfect na desktopie. Jeśli decyzja produktowa pójdzie pod prąd specyfikacji, **zaktualizuj ten dokument w tym samym PR** zanim ruszysz kod. Driver tu jest spec, nie kod.
