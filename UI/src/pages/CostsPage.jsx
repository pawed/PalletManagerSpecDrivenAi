import React, { useState, useMemo } from 'react';
import { I18N } from '../data/festival';
import { fmtPLN } from '../data/utils';
import { useAppContext } from '../context/AppContext';

const CostsPage = () => {
  const { lang, costs, revenue } = useAppContext();
  const t = I18N[lang];
  const [tab, setTab] = useState("overview");

  const totalCosts   = useMemo(() => costs.reduce((s, c) => s + c.amount, 0),   [costs]);
  const totalRevenue = useMemo(() => revenue.reduce((s, r) => s + r.amount, 0), [revenue]);
  const balance = totalRevenue - totalCosts;

  return (
    <>
      <div className="tabs">
        <button data-active={tab === "overview"} onClick={() => setTab("overview")}>{t.overview}</button>
        <button data-active={tab === "costs"}    onClick={() => setTab("costs")}>{t.costs}</button>
        <button data-active={tab === "revenue"}  onClick={() => setTab("revenue")}>{t.revenue}</button>
      </div>

      <div className="card">
        <div className="card__head">
          <div className="card__title">{t.balance}</div>
          <div className="card__sub">{lang === "pl" ? "edycja 2025" : "2025 edition"}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{t.revenue}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "var(--status-done)" }}>
              {fmtPLN(totalRevenue)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{t.costs}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "var(--chart-4)" }}>
              {fmtPLN(totalCosts)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>{t.balance}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: balance >= 0 ? "var(--status-done)" : "var(--chart-4)" }}>
              {balance >= 0 ? "+" : ""}{fmtPLN(balance)}
            </div>
          </div>
        </div>
      </div>

      {tab === "costs" && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card__head">
            <div className="card__title">{t.costs}</div>
            <div className="card__sub">{costs.length}</div>
          </div>
          {costs.map(c => (
            <div
              key={c.id}
              style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, padding: "8px 0", borderTop: "1px solid var(--border)", alignItems: "center" }}
            >
              <div>{lang === "pl" ? c.name : c.nameEn}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{fmtPLN(c.amount)}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "revenue" && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card__head">
            <div className="card__title">{t.revenue}</div>
            <div className="card__sub">{revenue.length}</div>
          </div>
          {revenue.map(r => (
            <div
              key={r.id}
              style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, padding: "8px 0", borderTop: "1px solid var(--border)", alignItems: "center" }}
            >
              <div>{lang === "pl" ? r.name : r.nameEn}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{fmtPLN(r.amount)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CostsPage;
