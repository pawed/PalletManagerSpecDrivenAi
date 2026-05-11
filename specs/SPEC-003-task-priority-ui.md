---
id: SPEC-003
title: Wyświetlanie i filtrowanie priorytetu tasków w UI
status: draft
priority: medium
agents: ui
---

## Problem / Cel
`TaskItem` ma pole `Priority` (Critical/High/Ordinary/Low/NiceToHave) zwracane przez API,
ale UI go nie wyświetla ani nie pozwala filtrować. Użytkownik powinien widzieć priorytet
na liście zadań i móc po nim filtrować.

## Kryteria akceptacji
- [ ] `TasksPage` (widok listy): priorytet widoczny przy każdym tasku (badge lub ikona)
- [ ] Filtr priorytetu w pasku filtrów (MultiSelect, obok filtra statusu)
- [ ] `Harmonogram`: priorytet widoczny na karcie zadania (opcjonalnie — tylko jeśli nie zaśmieca)
- [ ] Kolory/ikony priorytetów spójne z istniejącym systemem status-kolorów

## Zakres zmian
- **API:** nie — `priority` jest już w `TaskDto` i `taskService.normalise()`
- **UI:** tak — `TasksPage`, ewentualnie `Harmonogram`, `i18n.js` (nowe klucze)
- **Integracja:** nie

## Uwagi techniczne
- Wartości enum: `Critical`, `High`, `Ordinary`, `Low`, `NiceToHave`
- Pole `priority` już jest w znormalizowanym obiekcie task (pass-through z API)
- Nie dodawać nowych komponentów jeśli można użyć istniejącego `Badge`
- i18n: dodać tłumaczenia PL/EN dla każdego priorytetu
