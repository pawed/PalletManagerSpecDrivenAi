import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { I18N, FESTIVAL_DATA } from '../data/festival';
import { fmtPLN, isoDate, TODAY } from '../data/utils';
import { Avatars } from '../components/Layout';
import { useAppContext } from '../context/AppContext';

const OverviewPage = () => {
  const { lang, tasks, costs, revenue, items } = useAppContext();
  const navigate = useNavigate();
  const t = I18N[lang];

  const tasksDone  = tasks.filter(x => x.status === "done").length;
  const tasksTotal = tasks.filter(x => x.status !== "cancelled").length;
  const totalCosts   = costs.reduce((s, c) => s + c.amount, 0);
  const totalRevenue = revenue.reduce((s, r) => s + r.amount, 0);
  const balance = totalRevenue - totalCosts;

  const upcoming = useMemo(() => tasks
    .filter(x => x.date && x.status !== "done" && x.status !== "cancelled")
    .filter(x => x.date >= isoDate(TODAY))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6),
  [tasks]);

  const statusBreakdown = useMemo(() => {
    const m = { todo: 0, "in-progress": 0, done: 0, cancelled: 0 };
    tasks.forEach(x => m[x.status]++);
    return m;
  }, [tasks]);

  return (
    <>
      <div className="kpi-grid">
        <div className="kpi kpi--accent">
          <div className="kpi__label">{t.tasksDone}</div>
          <div className="kpi__value">
            {tasksDone}
            <span style={{ color: "var(--text-dim)", fontSize: 16 }}> / {tasksTotal}</span>
          </div>
          <div className="kpi__delta">{Math.round((tasksDone / tasksTotal) * 100)}%</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">{t.inProgress}</div>
          <div className="kpi__value">{statusBreakdown["in-progress"]}</div>
        </div>
        <div className="kpi kpi--positive">
          <div className="kpi__label">{t.revenue}</div>
          <div className="kpi__value">{fmtPLN(totalRevenue).replace(" zł", "")}</div>
          <div className="kpi__delta">PLN · {revenue.length} {lang === "pl" ? "pozycji" : "items"}</div>
        </div>
        <div className="kpi kpi--negative">
          <div className="kpi__label">{t.balance}</div>
          <div className="kpi__value">
            {balance >= 0 ? "+" : ""}{fmtPLN(balance).replace(" zł", "")}
          </div>
          <div className="kpi__delta">{fmtPLN(totalCosts)} {t.costs.toLowerCase()}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card__head">
          <div className="card__title">{lang === "pl" ? "Postęp przygotowań" : "Preparation progress"}</div>
          <div className="card__sub">{tasks.length} {lang === "pl" ? "zadań" : "tasks"}</div>
        </div>
        <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "var(--surface-2)" }}>
          <div style={{ width: `${(statusBreakdown.done         / tasks.length) * 100}%`, background: "var(--status-done)"      }} />
          <div style={{ width: `${(statusBreakdown["in-progress"]/ tasks.length) * 100}%`, background: "var(--status-progress)"  }} />
          <div style={{ width: `${(statusBreakdown.todo         / tasks.length) * 100}%`, background: "var(--status-todo)"      }} />
          <div style={{ width: `${(statusBreakdown.cancelled    / tasks.length) * 100}%`, background: "var(--status-cancelled)" }} />
        </div>
      </div>

      <div className="chart-grid">
        <div className="card">
          <div className="card__head">
            <div className="card__title">{lang === "pl" ? "Nadchodzące zadania" : "Upcoming tasks"}</div>
            <div className="card__sub">{upcoming.length}</div>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty">—</div>
          ) : (
            upcoming.map(task => (
              <div
                key={task.id}
                style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 10, padding: "8px 0", borderTop: "1px solid var(--border)", alignItems: "center", cursor: "pointer" }}
                onClick={() => navigate("/tasks")}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                  {task.date}
                </div>
                <div style={{ fontSize: 12.5 }}>{lang === "pl" ? task.task : task.taskEn}</div>
                <Avatars people={task.who} />
              </div>
            ))
          )}
        </div>

        <div className="card">
          <div className="card__head">
            <div className="card__title">{lang === "pl" ? "Magazyn" : "Inventory"}</div>
            <div className="card__sub">{items.length} {lang === "pl" ? "pozycji" : "items"}</div>
          </div>
          {FESTIVAL_DATA.LOCATIONS.map(loc => {
            const c   = items.filter(it => it.location === loc).length;
            const pct = (c / items.length) * 100;
            return (
              <div key={loc} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span>{loc}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{c}</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
