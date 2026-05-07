import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { I18N } from '../data/i18n';
import { LOCATIONS } from '../data/warehouse';
import { fmtPLN, isoDate, TODAY } from '../data/utils';
import { Avatars } from '../components/Layout';
import { useAppContext } from '../context/AppContext';

const OverviewPage = () => {
  const { lang, tasks, costs, revenue, items } = useAppContext();
  const navigate = useNavigate();
  const t = I18N[lang];

  const tasksDone = tasks.filter(x => x.status === "done").length;
  const tasksTotal = tasks.filter(x => x.status !== "cancelled").length;
  const totalCosts = costs.reduce((s, c) => s + c.amount, 0);
  const totalRevenue = revenue.reduce((s, r) => s + r.amount, 0);
  const balance = totalRevenue - totalCosts;

  const upcoming = useMemo(() => tasks
    .filter(x => x.date && x.status !==    "done" && x.status !== "cancelled")
    .filter(x => x.date >= isoDate(TODAY))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6),
    [tasks]);

  const statusBreakdown = useMemo(() => {
    const m = { todo: 0, "in-progress": 0, done: 0, cancelled: 0 };
    tasks.forEach(x => m[x.status]++);
    return m;
  }, [tasks]);

  const kpis = [
    {
      label: t.tasksDone,
      value: <>{tasksDone}<span className="text-muted-foreground text-base font-normal"> / {tasksTotal}</span></>,
      delta: `${Math.round((tasksDone / tasksTotal) * 100)}%`,
      accent: true,
    },
    { label: t.inProgress, value: statusBreakdown["in-progress"] },
    {
      label: t.revenue,
      value: fmtPLN(totalRevenue).replace(" zł", ""),
      delta: `PLN · ${revenue.length} ${lang === "pl" ? "pozycji" : "items"}`,
      positive: true,
    },
    {
      label: t.balance,
      value: `${balance >= 0 ? "+" : ""}${fmtPLN(balance).replace(" zł", "")}`,
      delta: `${fmtPLN(totalCosts)} ${t.costs.toLowerCase()}`,
      negative: balance < 0,
    },
  ];

  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        {kpis.map((k, i) => (
          <div key={i} className="bg-card border border-border rounded-[10px] px-4 py-3.5">
            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">{k.label}</p>
            <p className={[
              "font-mono text-[26px] font-semibold tracking-tight mt-1.5",
              k.accent ? "text-brand-text" : "",
              k.positive ? "text-status-done" : "",
              k.negative ? "text-[oklch(0.6_0.15_25)]" : "",
            ].join(" ")}>
              {k.value}
            </p>
            {k.delta && <p className="text-[11px] text-muted-foreground font-mono mt-1">{k.delta}</p>}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-card border border-border rounded-[10px] px-5 py-4 mb-5">
        <div className="flex items-baseline justify-between mb-3.5">
          <p className="text-[13px] font-semibold tracking-tight">
            {lang === "pl" ? "Postęp przygotowań" : "Preparation progress"}
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">{tasks.length} {lang === "pl" ? "zadań" : "tasks"}</p>
        </div>
        <div className="flex h-2.5 rounded-full overflow-hidden bg-secondary">
          <div style={{ width: `${(statusBreakdown.done / tasks.length) * 100}%` }} className="bg-status-done" />
          <div style={{ width: `${(statusBreakdown["in-progress"] / tasks.length) * 100}%` }} className="bg-status-progress" />
          <div style={{ width: `${(statusBreakdown.todo / tasks.length) * 100}%` }} className="bg-status-todo" />
          <div style={{ width: `${(statusBreakdown.cancelled / tasks.length) * 100}%` }} className="bg-status-cancelled" />
        </div>
      </div>

      {/* Two-column cards */}
      <div className="grid grid-cols-2 gap-4.5">
        {/* Upcoming tasks */}
        <div className="bg-card border border-border rounded-[10px] px-5 py-4">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[13px] font-semibold tracking-tight">
              {lang === "pl" ? "Nadchodzące zadania" : "Upcoming tasks"}
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">{upcoming.length}</p>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-center text-muted-foreground text-[13px] py-8">—</p>
          ) : (
            upcoming.map(task => (
              <div
                key={task.id}
                className="grid gap-2.5 py-2 border-t border-border items-center cursor-pointer hover:bg-secondary -mx-5 px-5 transition-colors"
                style={{ gridTemplateColumns: "60px 1fr auto" }}
                onClick={() => navigate("/tasks")}
              >
                <span className="font-mono text-[11px] text-muted-foreground">{task.date}</span>
                <span className="text-[12.5px]">{task.task}</span>
                <Avatars people={task.who} />
              </div>
            ))
          )}
        </div>

        {/* Inventory */}
        <div className="bg-card border border-border rounded-[10px] px-5 py-4">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-[13px] font-semibold tracking-tight">
              {lang === "pl" ? "Magazyn" : "Inventory"}
            </p>
            <p className="text-[11px] text-muted-foreground font-mono">{items.length} {lang === "pl" ? "pozycji" : "items"}</p>
          </div>
          {LOCATIONS.map(loc => {
            const c = items.filter(it => it.location === loc).length;
            const pct = (c / items.length) * 100;
            return (
              <div key={loc} className="mb-2.5">
                <div className="flex justify-between text-[12px] mb-1">
                  <span>{loc}</span>
                  <span className="font-mono text-muted-foreground">{c}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div style={{ width: `${pct}%` }} className="h-full bg-brand" />
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
