---
id: SPEC-001
title: Usuwanie zadania (soft delete)
status: draft
priority: high
agents: api, ui
---

## Problem / Cel
Harmonogram ma przycisk "Usuń" w menu kontekstowym, ale pokazuje tylko toast "nie obsługiwane".
Brak endpointu DELETE w API. Zadania powinny być usuwane przez zmianę statusu na `Deleted`
(soft delete) — zgodnie z istniejącym enum `TaskItemStatus.Deleted`.

## Kryteria akceptacji
- [ ] `DELETE /api/Tasks/{id}` — ustawia `Status = Deleted` (soft delete, nie usuwa wiersza)
- [ ] Harmonogram: kliknięcie "Usuń" → potwierdzenie (prosty dialog/toast z confirm) → wywołuje endpoint
- [ ] Po usunięciu task znika z widoku (filtrowany bo `status === 'Deleted'`)
- [ ] `taskService.js` ma metodę `deleteTask(id)`

## Zakres zmian
- **API:** tak — nowy endpoint `DELETE /api/Tasks/{id}` w `TasksController`
- **UI:** tak — Harmonogram: obsługa "Usuń" + `taskService.deleteTask()`
- **Integracja:** nie — endpoint wystarczy dodać do serwisu

## Uwagi techniczne
- Soft delete przez `Status = Deleted` — nie usuwać wiersza z DB
- W Harmonogramie taski z `status === 'Deleted'` są już filtrowane (nie trafiają do `dated`)
- Wzorzec confirm: użyć `window.confirm()` lub prostego toast z przyciskiem — nie dodawać nowego komponentu
