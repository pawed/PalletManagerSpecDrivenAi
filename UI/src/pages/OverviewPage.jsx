import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { I18N } from '../data/i18n';
import { fmtPLN } from '../data/utils';
import { Avatars } from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { useOverview } from '../hooks/useOverview.js';
import { queryKeys } from '../lib/queryKeys.js';

const OverviewPage = () => {
  const { lang } = useAppContext();
  const navigate = useNavigate();
  const t = I18N[lang];
  const queryClient = useQueryClient();

  const { data: overview, isLoading, isFetching } = useOverview();

  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.overview.all });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sb = overview?.statusBreakdown;
  const totalAllTasks = (sb?.done ?? 0) + (sb?.inProgress ?? 0) + (sb?.notStarted ?? 0) + (sb?.blocked ?? 0) + (sb?.deleted ?? 0);

  const kpis = [
    {
      label: t.tasksDone,
      value: <>{overview?.tasksDone ?? 0}<span className="text-muted-foreground text-base font-normal"> / {overview?.tasksTotal ?? 0}</span></>,
      delta: `${(overview?.tasksTotal ?? 0) > 0 ? Math.round(((overview?.tasksDone ?? 0) / overview.tasksTotal) * 100) : 0}%`,
      accent: true,
    },
    { label: t.inProgress, value: overview?.inProgress ?? 0 },
    {
      label: t.revenue,
      value: fmtPLN(overview?.totalRevenue ?? 0).replace(" zł", ""),
      delta: `PLN · ${overview?.revenueEntries ?? 0} ${lang === "pl" ? "pozycji" : "items"}`,
      positive: true,
    },
    {
      label: t.balance,
      value: `${(overview?.balance ?? 0) >= 0 ? "+" : ""}${fmtPLN(overview?.balance ?? 0).replace(" zł", "")}`,
      delta: `${fmtPLN(overview?.totalCosts ?? 0)} ${t.costs.toLowerCase()}`,
      negative: (overview?.balance ?? 0) < 0,
    },
  ];

  return (
    <div className="relative">
      {isFetching && !isLoading && (
        <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

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
          <div className="flex items-center gap-3">
            <p className="text-[11px] text-muted-foreground font-mono">{totalAllTasks} {lang === "pl" ? "zadań" : "tasks"}</p>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              {lang === "pl" ? "Odśwież" : "Refresh"}
            </button>
          </div>
        </div>
        <div className="flex h-2.5 rounded-full overflow-hidden bg-secondary">
          <div style={{ width: `${totalAllTasks ? ((sb?.done ?? 0) / totalAllTasks) * 100 : 0}%` }} className="bg-status-done" />
          <div style={{ width: `${totalAllTasks ? ((sb?.inProgress ?? 0) / totalAllTasks) * 100 : 0}%` }} className="bg-status-progress" />
          <div style={{ width: `${totalAllTasks ? ((sb?.notStarted ?? 0) / totalAllTasks) * 100 : 0}%` }} className="bg-status-todo" />
          <div style={{ width: `${totalAllTasks ? (((sb?.blocked ?? 0) + (sb?.deleted ?? 0)) / totalAllTasks) * 100 : 0}%` }} className="bg-status-cancelled" />
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
            <p className="text-[11px] text-muted-foreground font-mono">{overview?.upcomingTasks?.length ?? 0}</p>
          </div>
          {!overview?.upcomingTasks?.length ? (
            <p className="text-center text-muted-foreground text-[13px] py-8">—</p>
          ) : (
            overview.upcomingTasks.map(task => (
              <div
                key={task.id}
                className="grid gap-2.5 py-2 border-t border-border items-center cursor-pointer hover:bg-secondary -mx-5 px-5 transition-colors"
                style={{ gridTemplateColumns: "60px 1fr auto" }}
                onClick={() => navigate("/tasks")}
              >
                <span className="font-mono text-[11px] text-muted-foreground">{task.completeDate}</span>
                <span className="text-[12.5px]">{task.title}</span>
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
            <p className="text-[11px] text-muted-foreground font-mono">{overview?.warehouseItems ?? 0} {lang === "pl" ? "pozycji" : "items"}</p>
          </div>
          {overview?.warehouseByLocation?.map(({ location, count }) => {
            const pct = (count / (overview.warehouseItems || 1)) * 100;
            return (
              <div key={location} className="mb-2.5">
                <div className="flex justify-between text-[12px] mb-1">
                  <span>{location}</span>
                  <span className="font-mono text-muted-foreground">{count}</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div style={{ width: `${pct}%` }} className="h-full bg-brand" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
