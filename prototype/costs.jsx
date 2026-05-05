/* global React, I18N, utils, FESTIVAL_DATA, UI */
const { useState, useMemo } = React;

function CostsSection({ lang, costs, revenue }) {
  const t = I18N[lang];
  const [tab, setTab] = useState("overview");

  const totalCosts = useMemo(() => costs.reduce((s, c) => s + c.amount, 0), [costs]);
  const totalRevenue = useMemo(() => revenue.reduce((s, r) => s + r.amount, 0), [revenue]);
  const balance = totalRevenue - totalCosts;

  // group costs by category
  const byCategory = useMemo(() => {
    const m = {};
    costs.forEach(c => { m[c.category] = (m[c.category] || 0) + c.amount; });
    return Object.entries(m)
      .map(([cat, amt]) => {
        const def = FESTIVAL_DATA.COST_CATEGORIES.find(x => x.id === cat);
        return { cat, label: def ? def[lang] : cat, amount: amt };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [costs, lang]);

  const topCosts = useMemo(() => [...costs].sort((a,b) => b.amount - a.amount).slice(0, 8), [costs]);

  // group revenue by category
  const revenueByCat = useMemo(() => {
    const m = {};
    revenue.forEach(r => { m[r.category] = (m[r.category] || 0) + r.amount; });
    return Object.entries(m)
      .map(([cat, amt]) => {
        const def = FESTIVAL_DATA.REVENUE_CATEGORIES.find(x => x.id === cat);
        return { cat, label: def ? def[lang] : cat, amount: amt };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [revenue, lang]);

  const topRevenue = useMemo(() => [...revenue].sort((a,b) => b.amount - a.amount).slice(0, 8), [revenue]);

  return (
    <>
      <div className="tabs">
        <button data-active={tab === "overview"} onClick={() => setTab("overview")}>{t.overview}</button>
        <button data-active={tab === "costs"} onClick={() => setTab("costs")}>{t.costs}</button>
        <button data-active={tab === "revenue"} onClick={() => setTab("revenue")}>{t.revenue}</button>
      </div>

      {tab === "overview" && (
        <>
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card__head">
              <div className="card__title">{t.revenueVsCosts}</div>
              <div className="card__sub">{lang === "pl" ? "edycja 2025" : "2025 edition"}</div>
            </div>
            <div className="balance">
              <div className="balance__col">
                <div className="balance__col-label">{t.revenue}</div>
                <div className="balance__col-val" style={{ color: "var(--status-done)" }}>{utils.fmtPLN(totalRevenue)}</div>
              </div>
              <div className="balance__col">
                <div className="balance__col-label">{t.costs}</div>
                <div className="balance__col-val" style={{ color: "var(--chart-4)" }}>{utils.fmtPLN(totalCosts)}</div>
              </div>
              <div className="balance__col">
                <div className="balance__col-label">{t.balance}</div>
                <div className="balance__col-val" style={{ color: balance >= 0 ? "var(--status-done)" : "var(--chart-4)" }}>
                  {balance >= 0 ? "+" : ""}{utils.fmtPLN(balance)}
                </div>
              </div>
            </div>
            <div className="balance__bar" style={{ "--rev-pct": `${(totalRevenue / (totalRevenue + totalCosts)) * 100}%` }}>
              <div className="balance__bar-rev"></div>
              <div className="balance__bar-cost"></div>
            </div>
          </div>

          <div className="chart-grid">
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.topCosts}</div>
                <div className="card__sub">PLN</div>
              </div>
              <BarChart data={topCosts.map(c => ({ label: lang === "pl" ? c.name : c.nameEn, value: c.amount }))} />
            </div>
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.costsByCategory}</div>
                <div className="card__sub">{utils.fmtPLN(totalCosts)}</div>
              </div>
              <DonutChart data={byCategory} total={totalCosts} />
            </div>
          </div>
        </>
      )}

      {tab === "costs" && (
        <>
          <div className="chart-grid">
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.topCosts}</div>
                <div className="card__sub">PLN</div>
              </div>
              <BarChart data={topCosts.map(c => ({ label: lang === "pl" ? c.name : c.nameEn, value: c.amount }))} />
            </div>
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.costsByCategory}</div>
                <div className="card__sub">{utils.fmtPLN(totalCosts)}</div>
              </div>
              <DonutChart data={byCategory} total={totalCosts} />
            </div>
          </div>
          <CostTable items={costs} lang={lang} type="cost" total={totalCosts} />
        </>
      )}
      {tab === "revenue" && (
        <>
          <div className="chart-grid">
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.topRevenue}</div>
                <div className="card__sub">PLN</div>
              </div>
              <BarChart data={topRevenue.map(r => ({ label: lang === "pl" ? r.name : r.nameEn, value: r.amount }))} />
            </div>
            <div className="card">
              <div className="card__head">
                <div className="card__title">{t.revenueByCategory}</div>
                <div className="card__sub">{utils.fmtPLN(totalRevenue)}</div>
              </div>
              <DonutChart data={revenueByCat} total={totalRevenue} />
            </div>
          </div>
          <CostTable items={revenue} lang={lang} type="revenue" total={totalRevenue} />
        </>
      )}
    </>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div className="bar-row" key={i}>
          <div className="bar-row__label" title={d.label}>{d.label}</div>
          <div className="bar-row__bar">
            <div className="bar-row__fill" style={{
              width: `${(d.value / max) * 100}%`,
              background: `var(--chart-${(i % 9) + 1})`,
            }}></div>
          </div>
          <div className="bar-row__value">{utils.fmtPLN(d.value)}</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, total }) {
  const size = 180;
  const r = 70;
  const cx = size / 2, cy = size / 2;
  const C = 2 * Math.PI * r;

  let acc = 0;
  const segs = data.map((d, i) => {
    const frac = d.amount / total;
    const dash = frac * C;
    const offset = -acc * C;
    acc += frac;
    return { ...d, dash, offset, color: `var(--chart-${(i % 9) + 1})`, frac };
  });

  return (
    <div className="donut-wrap">
      <svg className="donut" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-2)" strokeWidth="22" />
        {segs.map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={s.color} strokeWidth="22"
            strokeDasharray={`${s.dash} ${C}`}
            strokeDashoffset={s.offset}
            transform={`rotate(-90 ${cx} ${cy})`} />
        ))}
        <text x={cx} y={cy - 2} className="donut-center">
          <tspan x={cx} className="donut-center__num">{utils.fmtPLN(total).replace(" zł", "")}</tspan>
          <tspan x={cx} dy="14" className="donut-center__lbl">PLN</tspan>
        </text>
      </svg>
      <div className="donut-legend">
        {segs.map((s, i) => (
          <div className="donut-legend__item" key={i}>
            <div className="donut-legend__swatch" style={{ background: s.color }}></div>
            <div>{s.label}</div>
            <div className="donut-legend__pct">{Math.round(s.frac * 100)}%</div>
            <div className="donut-legend__amount">{utils.fmtPLN(s.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostTable({ items, lang, type, total }) {
  const t = I18N[lang];
  const cats = type === "cost" ? FESTIVAL_DATA.COST_CATEGORIES : FESTIVAL_DATA.REVENUE_CATEGORIES;
  const sorted = [...items].sort((a,b) => b.amount - a.amount);
  return (
    <div className="table">
      <div className={"table__head table__head--" + (type === "revenue" ? "revenue" : "cost")}>
        <div>{t.item}</div>
        <div>{t.category}</div>
        <div style={{ textAlign: "right" }}>{t.amount}</div>
        {type === "cost" && <div></div>}
      </div>
      {sorted.map(item => {
        const cat = cats.find(c => c.id === item.category);
        return (
          <div key={item.id} className={"table__row table__row--" + (type === "revenue" ? "revenue" : "cost")}>
            <div>{lang === "pl" ? item.name : item.nameEn}</div>
            <div>{cat && <span className="cat-tag">{cat[lang]}</span>}</div>
            <div className="table__amt">{utils.fmtPLN(item.amount)}</div>
            {type === "cost" && <button className="task-row__menu"><UI.IconDots /></button>}
          </div>
        );
      })}
      <div className={"table__row table__row--" + (type === "revenue" ? "revenue" : "cost")} style={{ background: "var(--surface-2)", fontWeight: 700 }}>
        <div>{t.total}</div>
        <div></div>
        <div className="table__amt" style={{ fontSize: 14 }}>{utils.fmtPLN(total)}</div>
        {type === "cost" && <div></div>}
      </div>
    </div>
  );
}

window.CostsSection = CostsSection;
