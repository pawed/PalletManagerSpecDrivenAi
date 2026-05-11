---
name: Integration state — PalletTimeLine v0.0.3
description: Status integracji frontendu React z API .NET oraz kluczowe ustalenia — aktualizacja po dodaniu pola Priority do TaskDto
type: project
---

Pełna integracja frontend-API wykonana pomyślnie (build bez błędów). Ostatnia aktualizacja: 2026-05-11.

**Why:** Zastąpienie mock danych z `UI/src/data/*.js` prawdziwymi wywołaniami API. Aktualizacja po zmianie kontraktu TaskDto: rename pól (`task`→`title`, `note`→`description`) i przejście na enum statusów. v0.0.3: dodano pole `Priority` (enum: Critical/High/Ordinary/Low/NiceToHave) — pass-through w serwisie, fallback `"Ordinary"`.

**How to apply:** Przy kolejnych zmianach API weryfikować DTO w `API/PalletTimeLine.Api/DTOs/ApiDtos.cs` — to jest źródło prawdy. OpenAPI JSON (generowany przy buildzie) bywa opóźniony jeśli ASP.NET nie wygenerował go jeszcze ponownie po zmianie modelu.

## Lokalizacja plików

- DTO API (źródło prawdy): `API/PalletTimeLine.Api/DTOs/ApiDtos.cs`
- Schemat OpenAPI generowany przy buildzie: `API/PalletTimeLine.Api/obj/Debug/net9.0/EndpointInfo/PalletTimeLine.Api.json`
- API port: `http://localhost:5000`
- Serwisy frontendu: `UI/src/services/` (api.js, taskService.js, costService.js, revenueService.js, warehouseService.js, overviewService.js, userService.js)
- Proxy skonfigurowane w `UI/vite.config.js` — `/api` → `http://localhost:5000`

## Endpointy API (z OpenAPI)

| Endpoint | Metoda | Serwis |
|----------|--------|--------|
| /api/Tasks | GET | taskService.getAll() |
| /api/Tasks/{id} | GET | taskService.getById(id) |
| /api/Tasks/{id}/status | PATCH | taskService.updateStatus(id, status) |
| /api/Costs | GET | costService.getAll() |
| /api/Revenue | GET | revenueService.getAll() |
| /api/Warehouse | GET | warehouseService.getAll() |
| /api/Overview | GET | overviewService.getOverview() |
| /api/Users | GET/POST | userService.getAll(), userService.getPeopleNames() |
| /api/Users/{id} | GET/PUT/DELETE | userService.getAll() |

## Mapowania pól w taskService.js (aktualny stan po v0.0.3)

API zwraca → UI widzi:
- `title`       → `task`
- `description` → `note`     (null → "")
- `who`         → `who`      (null → [])
- `date`        → `date`     (null → null)
- `priority`    → `priority` (pass-through enum name, null → "Ordinary")
- `status` enum → UI string:
  - `NotStarted` → `"todo"`
  - `InProgress` → `"in-progress"`
  - `Done`       → `"done"`
  - `Blocked`    → `"todo"` (brak oddzielnego bucket w UI)
  - `Deleted`    → `"cancelled"`

PATCH updateStatus wysyła odwrotne mapowanie: UI string → API enum name.

Komponenty (TasksPage, OverviewPage, Harmonogram) nadal używają starych UI stringów — nie wymagają zmian.

## Zmiany w komponentach (v0.0.1)

- `AppContext.jsx` — zastąpiono statyczne importy wywołaniami serwisów, dodano `loading`, `error`, `people`, `updateTaskStatus`
- `TasksPage.jsx` — `toggleStatus` używa `updateTaskStatus` z kontekstu (wywołuje PATCH API + aktualizuje stan lokalny), `PEOPLE` zastąpione `people` z kontekstu
- `OverviewPage.jsx` — usunięto import `LOCATIONS`, zastąpiony dynamicznym wyliczeniem z `items`
- `WarehousePage.jsx` — jak wyżej dla `LOCATIONS`
- `vite.config.js` — dodano sekcję `proxy`

## Statyczne dane zachowane (nie pobierane z API)

- `TASK_CATEGORIES` — konfiguracja wyświetlania kategorii, brak endpointu
- `WH_CATEGORIES` — jak wyżej
- `COST_CATEGORIES`, `REVENUE_CATEGORIES` — jak wyżej
- `PEOPLE` — fallback gdy API Users niedostępne

## Uwagi

- `overviewService` jest gotowy ale OverviewPage nadal oblicza statystyki lokalnie z danych tasks/costs/revenue — jest to celowe, dane są już załadowane do stanu
- `Harmonogram.jsx` używa `setTasks` bezpośrednio do usuwania zadań ze stanu (brak DELETE /api/Tasks w API)
- `userService.getPeopleNames()` ma graceful fallback na statyczny `PEOPLE` gdy API niedostępne
- `data/tasks.js` zachowuje UI-kształt (pola: task/note, statusy: todo/in-progress/done/cancelled) — odpowiada wyjściowi `normalise()` a nie surowemu API
