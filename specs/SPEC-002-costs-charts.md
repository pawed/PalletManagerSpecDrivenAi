---
id: SPEC-002
title: Wykresy na stronie Kosztów
status: draft
priority: medium
agents: ui
---

## Problem / Cel
Strona Kosztów (`CostsPage`) pokazuje tylko tabele. Według `prototype/DESIGN_SPEC.md` (sekcja 4.3)
powinna zawierać: BarChart wydatków w czasie, DonutChart według kategorii, BalanceBar.

## Kryteria akceptacji
- [ ] BarChart: wydatki i przychody per kategoria (dane z istniejącego `costsService`/`revenueService`)
- [ ] DonutChart: podział kosztów według kategorii (%)
- [ ] BalanceBar: wizualna proporcja przychody/koszty/balans
- [ ] Wykresy SVG — bez zewnętrznych bibliotek chartingowych (zgodnie z DESIGN_SPEC)
- [ ] Responsywne, dopasowane do istniejącego stylu (Tailwind + CSS vars)

## Zakres zmian
- **API:** nie — dane już dostępne przez istniejące endpointy
- **UI:** tak — nowe komponenty chart w `CostsPage` lub osobny `Charts.jsx`
- **Integracja:** nie

## Uwagi techniczne
- Źródło wymagań: `prototype/DESIGN_SPEC.md` sekcja 4.3 + ewentualne pliki JSX w `prototype/`
- Użyć istniejących CSS variables (`--status-done`, `--accent`, etc.) dla kolorów
- BalanceBar: proporcjonalny pasek (tak jak progress bar w OverviewPage)
