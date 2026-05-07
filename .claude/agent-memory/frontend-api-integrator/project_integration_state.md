---
name: Integration state — PalletTimeLine v0.0.1
description: Status integracji frontendu React z API .NET oraz kluczowe ustalenia z pierwszej pełnej integracji
type: project
---

Pełna integracja frontend-API wykonana pomyślnie (build bez błędów). Data: 2026-05-07.

**Why:** Zastąpienie mock danych z `UI/src/data/*.js` prawdziwymi wywołaniami API.

**How to apply:** Przy kolejnych zmianach API weryfikować DTO w ApiDtos.cs i aktualizować serwisy w `UI/src/services/`.

## Lokalizacja plików

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

## Mapowania pól — nie były potrzebne

TaskDto ma identyczne pola co UI (`task`, `who`, `date`, `status`, `category`, `note`) — wyjątkowo, API zostało zaprojektowane pod UI.
Wszystkie DTO mają pola `nullable` — serwisy normalizują null → "" lub [] gdzie UI oczekuje stringa/tablicy.

## Zmiany w komponentach

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
