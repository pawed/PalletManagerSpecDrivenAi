/* global React, I18N, utils, FESTIVAL_DATA, UI */
const { useMemo } = React;

function OverviewSection({ lang, tasks, costs, revenue, items, onNav }) {
  const t = I18N[lang];

  const tasksDone = tasks.filter(x => x.status === "done").length;
  const tasksTotal = tasks.filter(x => x.status !== "cancelled").length;
  const totalCosts = costs.reduce((s, c) => s + c.amount, 0);
  const totalRevenue = revenue.reduce((s, r) => s + r.amount, 0);
  const balance = totalRevenue - totalCosts;

  const upcoming = useMemo(() => {
    return tasks
      .filter(x => x.date && x.status !== "done" && x.status !== "cancelled")
      .filter(x => x.date >= utils.isoDate(utils.TODAY))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6);
  }, [tasks]);

  const overdue = useMemo(() => {
    return tasks
      .filter(x => x.date && x.status !== "done" && x.status !== "cancelled")
      .filter(x => x.date < utils.isoDate(utils.TODAY));
  }, [tasks]);

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
          <div className="kpi__value">{tasksDone}<span style={{ color: "var(--text-dim)", fontSize: 16 }}> / {tasksTotal}</span></div>
          <div className="kpi__delta">{Math.round((tasksDone / tasksTotal) * 100)}%</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">{t.inProgress}</div>
          <div className="kpi__value">{statusBreakdown["in-progress"]}</div>
          <div className="kpi__delta">{overdue.length} {lang === "pl" ? "po terminie" : "overdue"}</div>
        </div>
        <div className="kpi kpi--positive">
          <div className="kpi__label">{t.revenue}</div>
          <div className="kpi__value">{utils.fmtPLN(totalRevenue).replace(" zł", "")}</div>
          <div className="kpi__delta">PLN · {revenue.length} {lang === "pl" ? "pozycji" : "items"}</div>
        </div>
        <div className="kpi kpi--negative">
          <div className="kpi__label">{t.balance}</div>
          <div className="kpi__value">{balance >= 0 ? "+" : ""}{utils.fmtPLN(balance).replace(" zł", "")}</div>
          <div className="kpi__delta">{utils.fmtPLN(totalCosts)} {t.costs.toLowerCase()}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="card" style={{ marginBottom: 18 }}>
        <div className="card__head">
          <div className="card__title">{lang === "pl" ? "Postęp przygotowań" : "Preparation progress"}</div>
          <div className="card__sub">{tasks.length} {lang === "pl" ? "zadań" : "tasks"}</div>
        </div>
        <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "var(--surface-2)" }}>
          <div style={{ width: `${(statusBreakdown.done / tasks.length) * 100}%`, background: "var(--status-done)" }}></div>
          <div style={{ width: `${(statusBreakdown["in-progress"] / tasks.length) * 100}%`, background: "var(--status-progress)" }}></div>
          <div style={{ width: `${(statusBreakdown.todo / tasks.length) * 100}%`, background: "var(--status-todo)" }}></div>
          <div style={{ width: `${(statusBreakdown.cancelled / tasks.length) * 100}%`, background: "var(--status-cancelled)" }}></div>
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap", fontSize: 11.5 }}>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-done)" }}></span><strong>{statusBreakdown.done}</strong> {t.done}</span>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-progress)" }}></span><strong>{statusBreakdown["in-progress"]}</strong> {t.inProgress}</span>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-todo)" }}></span><strong>{statusBreakdown.todo}</strong> {t.todo}</span>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-cancelled)" }}></span><strong>{statusBreakdown.cancelled}</strong> {t.cancelled}</span>
        </div>
      </div>

      <div className="chart-grid">
        <div className="card">
          <div className="card__head">
            <div className="card__title">{t.upcoming}</div>
            <div className="card__sub">{upcoming.length}</div>
          </div>
          {upcoming.length === 0 ? (
            <div className="empty">—</div>
          ) : upcoming.map(task => (
            <div key={task.id} style={{ display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 10, padding: "8px 0", borderTop: "1px solid var(--border)", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{utils.fmtDate(task.date, lang)}</div>
              <div style={{ fontSize: 12.5 }}>{lang === "pl" ? task.task : task.taskEn}</div>
              <UI.Avatars people={task.who} />
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card__head">
            <div className="card__title">{lang === "pl" ? "Magazyn" : "Inventory"}</div>
            <div className="card__sub">{items.length} {lang === "pl" ? "pozycji" : "items"}</div>
          </div>
          {FESTIVAL_DATA.LOCATIONS.map(loc => {
            const c = items.filter(it => it.location === loc).length;
            const pct = (c / items.length) * 100;
            return (
              <div key={loc} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span>{loc}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{c}</span>
                </div>
                <div style={{ height: 6, background: "var(--surface-2)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--accent)" }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

window.OverviewSection = OverviewSection;
