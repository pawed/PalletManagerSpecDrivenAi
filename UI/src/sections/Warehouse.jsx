import React, { useState, useMemo } from 'react';
import { I18N, FESTIVAL_DATA } from '../data/festival';
import { IconSearch } from '../components/Icons';

const Warehouse = ({ lang, items }) => {
  const t = I18N[lang];
  const [filterLocations, setFilterLocations] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return items.filter(it => {
      if (filterCategories.length > 0 && !filterCategories.includes(it.category)) return false;
      if (filterLocations.length > 0 && !filterLocations.includes(it.location)) return false;
      if (query) {
        const q = query.toLowerCase();
        const txt = (lang === "pl" ? it.name : it.nameEn).toLowerCase();
        if (!txt.includes(q) && !(it.note || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [items, filterCategories, filterLocations, query, lang]);

  const locCounts = useMemo(() => {
    const m = {};
    items.forEach(it => {
      m[it.location] = (m[it.location] || 0) + 1;
    });
    return m;
  }, [items]);

  return (
    <>
      <div className="filterbar" style={{ marginBottom: 10 }}>
        <button
          className="chip"
          data-active={filterLocations.length === 0}
          onClick={() => setFilterLocations([])}
        >
          {t.all} <span style={{ opacity: 0.6, marginLeft: 2 }}>({items.length})</span>
        </button>
        {FESTIVAL_DATA.LOCATIONS.map(loc => {
          const active = filterLocations.includes(loc);
          return (
            <button
              key={loc}
              className="chip"
              data-active={active}
              onClick={() => {
                if (active) setFilterLocations(filterLocations.filter(x => x !== loc));
                else setFilterLocations([...filterLocations, loc]);
              }}
            >
              {loc} <span style={{ opacity: 0.6, marginLeft: 2 }}>({locCounts[loc] || 0})</span>
            </button>
          );
        })}
      </div>

      <div className="filterbar">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 30 }}
          />
          <div style={{ position: "absolute", left: 9, top: 8, color: "var(--text-dim)" }}>
            <IconSearch />
          </div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-muted)" }}>
          {filtered.length} {lang === "pl" ? "pozycji" : "items"}
        </div>
      </div>

      <div className="table">
        <div className="table__head">
          <div>{t.name}</div>
          <div style={{ textAlign: "right" }}>{t.qty}</div>
          <div>{t.category}</div>
          <div>Lokalizacja</div>
          <div>{t.note}</div>
        </div>
        {filtered.length === 0 ? (
          <div className="empty">{lang === "pl" ? "Brak pozycji spełniających filtry" : "No items match filters"}</div>
        ) : (
          filtered.map(it => {
            const cat = FESTIVAL_DATA.WH_CATEGORIES.find(c => c.id === it.category);
            return (
              <div key={it.id} className="table__row">
                <div style={{ fontWeight: 500 }}>{lang === "pl" ? it.name : it.nameEn}</div>
                <div style={{ fontWeight: 600 }}>
                  {it.qty}
                  <span style={{ color: "var(--text-dim)", fontWeight: 400, marginLeft: 3 }}>{it.unit}</span>
                </div>
                <div>{cat && <span className="cat-tag">{cat[lang]}</span>}</div>
                <div><span className="loc-tag">{it.location}</span></div>
                <div style={{ color: "var(--text-muted)", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={it.note}>
                  {it.note || "—"}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Warehouse;
