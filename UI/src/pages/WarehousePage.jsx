import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { I18N } from '../data/i18n';
import { WH_CATEGORIES, LOCATIONS } from '../data/warehouse';
import { Input } from '../components/ui/input';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

const WarehousePage = () => {
  const { lang, items } = useAppContext();
  const t = I18N[lang];

  const [filterLocations,  setFilterLocations]  = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [query,            setQuery]            = useState("");

  const filtered = useMemo(() => items.filter(it => {
    if (filterCategories.length > 0 && !filterCategories.includes(it.category)) return false;
    if (filterLocations.length  > 0 && !filterLocations.includes(it.location))  return false;
    if (query && !it.name.toLowerCase().includes(query.toLowerCase()) &&
        !(it.note || "").toLowerCase().includes(query.toLowerCase()))            return false;
    return true;
  }), [items, filterCategories, filterLocations, query]);

  const locCounts = useMemo(() => {
    const m = {};
    items.forEach(it => { m[it.location] = (m[it.location] || 0) + 1; });
    return m;
  }, [items]);

  const Chip = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={cn(
        'h-7 px-3 rounded-full border text-[11.5px] font-medium inline-flex items-center gap-1 transition-colors',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-card text-muted-foreground border-border hover:border-[oklch(0.84_0.01_80)] hover:text-foreground'
      )}
    >
      {children}
    </button>
  );

  return (
    <>
      {/* Location chips */}
      <div className="flex flex-wrap gap-2 mb-2.5">
        <Chip active={filterLocations.length === 0} onClick={() => setFilterLocations([])}>
          {t.all} <span className="opacity-60">({items.length})</span>
        </Chip>
        {LOCATIONS.map(loc => {
          const active = filterLocations.includes(loc);
          return (
            <Chip
              key={loc}
              active={active}
              onClick={() =>
                active
                  ? setFilterLocations(filterLocations.filter(x => x !== loc))
                  : setFilterLocations([...filterLocations, loc])
              }
            >
              {loc} <span className="opacity-60">({locCounts[loc] || 0})</span>
            </Chip>
          );
        })}
      </div>

      {/* Search + count */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={t.search}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-8 w-56"
          />
        </div>
        <span className="ml-auto font-mono text-[11.5px] text-muted-foreground">
          {filtered.length} {lang === "pl" ? "pozycji" : "items"}
        </span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-[10px] overflow-hidden">
        <div
          className="grid gap-3.5 px-3.5 py-3 bg-secondary text-[11px] font-semibold uppercase tracking-widest text-muted-foreground border-b border-border"
          style={{ gridTemplateColumns: "1fr auto 150px 120px 200px" }}
        >
          <div>{t.name}</div>
          <div className="text-right">{t.qty}</div>
          <div>{t.category}</div>
          <div>Lokalizacja</div>
          <div>{t.note}</div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground text-[13px] py-10">
            {lang === "pl" ? "Brak pozycji spełniających filtry" : "No items match filters"}
          </p>
        ) : (
          filtered.map(it => {
            const cat = WH_CATEGORIES.find(c => c.id === it.category);
            return (
              <div
                key={it.id}
                className="grid gap-3.5 px-3.5 py-3 border-b border-border last:border-b-0 items-center text-[13px] hover:bg-secondary transition-colors"
                style={{ gridTemplateColumns: "1fr auto 150px 120px 200px" }}
              >
                <span className="font-medium">{it.name}</span>
                <span className="font-semibold">
                  {it.qty}
                  <span className="text-muted-foreground font-normal ml-1">{it.unit}</span>
                </span>
                <div>
                  {cat && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent text-accent-foreground text-[11px] font-medium">
                      {cat[lang]}
                    </span>
                  )}
                </div>
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent text-accent-foreground text-[11px] font-medium">
                    {it.location}
                  </span>
                </div>
                <span className="text-muted-foreground text-[12px] truncate" title={it.note}>
                  {it.note || "—"}
                </span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default WarehousePage;
