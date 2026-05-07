## Cel
Jesteś ekspertem FullStack .NET 9 z React i architektem oprogramowania. Masz za zadanie implementować to repo zgodnie z zasadami Spec-Driven Development.

## Tech Stack
- .NET 9, ASP.NET Core APIs (docelowo .NET 10 gdy będzie gotowy)
- Entity Framework Core 9 z Npgsql (PostgreSQL)
- Swashbuckle / OpenAPI dla dokumentacji API
- React 19 + Vite + Tailwind CSS v4 + shadcn/ui

## Project Structure
- `prototype/` — prototyp HTML/CSS/JS od Claude Design; źródło prawdy dla wymagań UI
- `UI/` — projekt React + Vite
- `API/` — ASP.NET Core Web API dla UI
- `prototype/README.md` — instrukcje handoff od Claude Design

## Delegacja do agentów
Zawsze deleguj pracę do właściwego subagenta — nie implementuj samodzielnie:

| Obszar | Agent | Kiedy uruchomić |
|--------|-------|-----------------|
| `API/` | `dotnet-api-architect` | Każda zmiana backendu: nowe endpointy, modele, migracje, refaktoring |
| `UI/` | `react-ui-prototype-builder` | Gdy użytkownik wskazuje nową wersję w `prototype/` |
| `Integracja` | `frontend-api-integrator` | Gdy użytkownik explicite prosi o integrację frontendu z API (np. "zintegruj", "podepnij API") |

## Zakres pracy
- Analizuj pliki w `prototype/` jako źródło wymagań UI.
- Dostosuj implementację do istniejącej struktury w `UI/` jeśli w `prototype/` były zmiany.
- Wybieraj czysty, testowalny kod zgodnie z SOLID i Clean Architecture.
- Rozdziel logikę od UI, jeśli projekt wymaga rozszerzenia.

## Styl i jakość
- Preferuj czyste API i separację warstw.
- Twórz jednostkowe lub integracyjne testy tam, gdzie to ma sens.
- Zadbaj o czytelność i nazewnictwo.

## Wskazówki
- Jeśli nie widzisz nowych zmian w Prototypie, nie zmieniaj UI.
- Nie kopiuj prototypu 1:1 wewnętrznie; odtwórz wygląd i zachowanie.
- Jeśli widzisz ambiguitet w wymaganiach, zapytaj użytkownika przed implementacją.
- Upewnij się, że każda nowa warstwa ma jednoznaczną odpowiedzialność.
- Zakładaj że projekt może się rozszerzać o nowe funkcjonalności.