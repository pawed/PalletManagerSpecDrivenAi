import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, ChevronDown, MoreHorizontal, Pencil, Trash2, Info, Plus, CircleDot } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { TASK_CATEGORIES, PEOPLE } from '../data/tasks';
import { TODAY, isoDate, parseISO } from '../data/utils';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './ui/popover';
import { cn } from '../lib/utils';
import TaskModal from './TaskModal';
import * as userService from '../services/userService.js';
import * as taskService from '../services/taskService.js';
import { useAppContext } from '../context/AppContext';

const FESTIVAL_START = "2025-08-08";
const FESTIVAL_END   = "2025-08-09";
const STEP_OPTIONS   = [3, 7, 14];
const ROW_HEIGHT     = 120;
const LS_STEP        = "ptl.gantt.step";
const LS_START       = "ptl.gantt.start";

const PL_DAYS   = ["Pon","Wt","Śr","Czw","Pt","Sob","Nd"];
const EN_DAYS   = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const PL_MONTHS = ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"];
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const PL_MONTHS_SHORT = ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"];
const EN_MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function isFestival(iso) { return iso === FESTIVAL_START || iso === FESTIVAL_END; }
function isWeekend(d) { const w = d.getDay(); return w === 0 || w === 6; }

function fmtRange(startIso, endIso, lang) {
  const s = parseISO(startIso); const e = parseISO(endIso);
  const m = lang === "pl" ? PL_MONTHS_SHORT : EN_MONTHS_SHORT;
  if (lang === "pl") {
    if (s.getMonth() === e.getMonth()) return `${s.getDate()}–${e.getDate()} ${m[s.getMonth()]} ${s.getFullYear()}`;
    return `${s.getDate()} ${m[s.getMonth()]} – ${e.getDate()} ${m[e.getMonth()]} ${e.getFullYear()}`;
  }
  if (s.getMonth() === e.getMonth()) return `${m[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`;
  return `${m[s.getMonth()]} ${s.getDate()} – ${m[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}

function loadInitialStep() {
  try { const v = parseInt(localStorage.getItem(LS_STEP), 10); if (STEP_OPTIONS.includes(v)) return v; } catch (e) {}
  return 14;
}
function loadInitialStart() {
  try { const v = localStorage.getItem(LS_START); if (v) { const d = parseISO(v); if (d && !isNaN(d.getTime())) return d; } } catch (e) {}
  const d = parseISO(FESTIVAL_START); d.setDate(d.getDate() - 5); return d;
}

function MiniCalendar({ lang, selected, onSelect, onClose }) {
  const initial = parseISO(selected) || new Date(TODAY);
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const todayIso = isoDate(TODAY);
  const months   = lang === "pl" ? PL_MONTHS : EN_MONTHS;
  const dayLabels = lang === "pl" ? ["Pn","Wt","Śr","Cz","Pt","Sb","Nd"] : ["Mo","Tu","We","Th","Fr","Sa","Su"];
  const year = view.getFullYear(); const month = view.getMonth();
  const firstDay = new Date(year, month, 1);
  let offset = firstDay.getDay() - 1; if (offset < 0) offset = 6;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const shiftMonth = n => setView(v => new Date(v.getFullYear(), v.getMonth() + n, 1));

  return (
    <div className="w-64 p-3">
      <div className="flex items-center justify-between mb-2.5">
        <button className={cn("w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors")} onClick={() => shiftMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-[13px] font-semibold">{months[month]} {year}</span>
        <button className={cn("w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors")} onClick={() => shiftMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {dayLabels.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1 font-mono">{d}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`b${i}`} />;
          const iso = isoDate(date);
          const dow = date.getDay();
          const weekend = dow === 0 || dow === 6;
          return (
            <button
              key={iso}
              className={cn(
                "h-7 w-full rounded text-[12px] flex items-center justify-center transition-colors",
                weekend && "text-muted-foreground",
                isFestival(iso) && "bg-accent text-accent-foreground font-bold",
                iso === todayIso && "ring-1 ring-ring ring-offset-0",
                iso === selected && "bg-foreground text-background",
                iso !== selected && "hover:bg-secondary",
              )}
              onClick={() => { onSelect(iso); onClose(); }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="flex gap-1.5 mt-2.5 pt-2.5 border-t border-border">
        <button
          className="flex-1 h-7 rounded border border-border bg-secondary text-muted-foreground text-[11.5px] font-semibold hover:border-[oklch(0.84_0.01_80)] hover:text-foreground transition-colors"
          onClick={() => { onSelect(isoDate(TODAY)); onClose(); }}
        >
          {lang === "pl" ? "Dziś" : "Today"}
        </button>
        <button
          className="flex-1 h-7 rounded border border-border bg-secondary text-muted-foreground text-[11.5px] font-semibold hover:border-[oklch(0.84_0.01_80)] hover:text-foreground transition-colors"
          onClick={() => { onSelect(FESTIVAL_START); onClose(); }}
        >
          {lang === "pl" ? "Festiwal" : "Festival"}
        </button>
      </div>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: 'NotStarted', pl: 'Nie rozpoczęte', en: 'Not started' },
  { value: 'InProgress', pl: 'W trakcie',      en: 'In progress' },
  { value: 'Done',       pl: 'Zrobione',       en: 'Done'        },
  { value: 'Blocked',    pl: 'Zablokowane',    en: 'Blocked'     },
  { value: 'Deleted',    pl: 'Usunięte',       en: 'Deleted'     },
];

function TaskCardMenu({ task, lang, onEdit, onView, onStatusChange }) {
  const [statusOpen, setStatusOpen] = useState(false);
  const statusLabel = (s) => lang === 'pl' ? s.pl : s.en;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="shrink-0 h-5 w-5 rounded flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"
          onClick={e => e.stopPropagation()}
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="end" sideOffset={4}>
        {/* Szczegóły */}
        <PopoverClose asChild>
          <button
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground"
            onClick={onView}
          >
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
            {lang === 'pl' ? 'Szczegóły' : 'Details'}
          </button>
        </PopoverClose>

        {/* Edytuj */}
        <PopoverClose asChild>
          <button
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            {lang === 'pl' ? 'Edytuj' : 'Edit'}
          </button>
        </PopoverClose>

        <div className="my-1 h-px bg-border" />

        {/* Zmień status — submenu on hover */}
        <div
          className="relative"
          onMouseEnter={() => setStatusOpen(true)}
          onMouseLeave={() => setStatusOpen(false)}
        >
          <button className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground">
            <span className="flex items-center gap-2">
              <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />
              {lang === 'pl' ? 'Zmień status' : 'Change status'}
            </span>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          </button>
          {statusOpen && (
            <div className="absolute left-full top-0 ml-1 w-40 bg-popover border border-border rounded-[10px] shadow-[var(--shadow)] p-1 z-[300]">
              {STATUS_OPTIONS.filter(s => s.value !== task.status && s.value !== 'Deleted').map(s => (
                <PopoverClose asChild key={s.value}>
                  <button
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground"
                    onClick={() => onStatusChange(task.id, s.value)}
                  >
                    {statusLabel(s)}
                  </button>
                </PopoverClose>
              ))}
            </div>
          )}
        </div>

        {/* Usuń — tylko gdy task nie jest już Deleted */}
        {task.status !== 'Deleted' && (
          <>
            <div className="my-1 h-px bg-border" />
            <PopoverClose asChild>
              <button
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-[oklch(0.55_0.2_27)]"
                onClick={() => onStatusChange(task.id, 'Deleted')}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {lang === 'pl' ? 'Usuń' : 'Delete'}
              </button>
            </PopoverClose>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

const STATUS_COLORS = {
  NotStarted: { border: "var(--status-todo)",     bg: "var(--status-todo-bg)"     },
  InProgress:  { border: "var(--status-progress)", bg: "var(--status-progress-bg)" },
  Done:        { border: "var(--status-done)",     bg: "var(--status-done-bg)"     },
  Blocked:     { border: "oklch(0.58 0.22 25)",    bg: "oklch(0.97 0.02 25)"      },
  Deleted:     { border: "var(--status-cancelled)",bg: "var(--status-cancelled-bg)"},
};

const GANTT_STATUSES = ['NotStarted', 'InProgress', 'Done', 'Blocked'];
const LABEL_COL_W = 90;
const CARD_H   = 104;
const CARD_GAP = 6;
const ROW_PAD  = 8;

const Harmonogram = ({ lang, tasks }) => {
  const queryClient = useQueryClient();
  const { showAddTask, setShowAddTask } = useAppContext();
  const [windowStart, setWindowStart] = useState(loadInitialStart);
  const [windowDays,  setWindowDays]  = useState(loadInitialStep);
  const [pulseIso,    setPulseIso]    = useState(null);
  const [editTask,    setEditTask]    = useState(null);
  const [viewTask,    setViewTask]    = useState(null);
  const [people,      setPeople]      = useState(PEOPLE);

  const handleStatusChange = async (id, status) => {
    const prev = queryClient.getQueryData(['tasks']);
    queryClient.setQueryData(['tasks'], (old) =>
      old?.map(t => t.id === id ? { ...t, status } : t) ?? old
    );
    try {
      await taskService.updateStatus(id, status);
      toast.success('Status zaktualizowany');
    } catch (err) {
      queryClient.setQueryData(['tasks'], prev);
      toast.error('Nie udało się zmienić statusu', { description: err.message });
    }
  };

  useEffect(() => {
    userService.getPeople().then(setPeople).catch(() => {});
  }, []);

  useEffect(() => { try { localStorage.setItem(LS_STEP,  String(windowDays)); }    catch (e) {} }, [windowDays]);
  useEffect(() => { try { localStorage.setItem(LS_START, isoDate(windowStart)); }  catch (e) {} }, [windowStart]);
  useEffect(() => {
    if (!pulseIso) return;
    const id = setTimeout(() => setPulseIso(null), 1800);
    return () => clearTimeout(id);
  }, [pulseIso]);

  const todayIso = isoDate(TODAY);

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < windowDays; i++) {
      const d = new Date(windowStart);
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [windowStart, windowDays]);

  const windowStartIso = isoDate(days[0]);
  const windowEndIso   = isoDate(days[days.length - 1]);

  const dated = useMemo(() => (
    tasks
      .filter(t => t.completeDate && t.completeDate >= windowStartIso && t.completeDate <= windowEndIso)
      .sort((a, b) => a.completeDate.localeCompare(b.completeDate))
  ), [tasks, windowStartIso, windowEndIso]);

  // lane index per task: tasks sharing (status, completeDate) are stacked vertically
  const laneMap = useMemo(() => {
    const groups = {};
    dated.forEach(task => {
      if (!GANTT_STATUSES.includes(task.status)) return;
      const key = `${task.status}|${task.completeDate}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(task.id);
    });
    const result = {};
    Object.values(groups).forEach(ids => ids.forEach((id, i) => { result[id] = i; }));
    return result;
  }, [dated]);

  // per-status row: dynamic height based on max stacked lanes
  const rowLayout = useMemo(() => {
    const maxLanes = {};
    GANTT_STATUSES.forEach(s => { maxLanes[s] = 1; });
    dated.forEach(task => {
      if (!GANTT_STATUSES.includes(task.status)) return;
      maxLanes[task.status] = Math.max(maxLanes[task.status], (laneMap[task.id] ?? 0) + 1);
    });
    const tops = {};
    let cumTop = 0;
    GANTT_STATUSES.forEach(s => {
      tops[s] = cumTop;
      cumTop += ROW_PAD * 2 + maxLanes[s] * CARD_H + Math.max(0, maxLanes[s] - 1) * CARD_GAP;
    });
    return { tops, heights: Object.fromEntries(GANTT_STATUSES.map(s => [s, ROW_PAD * 2 + maxLanes[s] * CARD_H + Math.max(0, maxLanes[s] - 1) * CARD_GAP])), totalHeight: cumTop };
  }, [dated, laneMap]);

  const shiftBy = d => { const ns = new Date(windowStart); ns.setDate(ns.getDate() + d); setWindowStart(ns); };

  const focusOnDate = iso => {
    const d = parseISO(iso); const half = Math.floor(windowDays / 2);
    const ns = new Date(d); ns.setDate(ns.getDate() - half);
    setWindowStart(ns); setPulseIso(iso);
  };

  const changeStep = newStep => {
    const mid = new Date(windowStart); mid.setDate(mid.getDate() + Math.floor(windowDays / 2));
    const ns  = new Date(mid);        ns.setDate(ns.getDate()   - Math.floor(newStep / 2));
    setWindowDays(newStep); setWindowStart(ns);
  };

  const dayLabels  = lang === "pl" ? PL_DAYS : EN_DAYS;
  const categories = TASK_CATEGORIES;
  const getCatLabel = id => {
    const c = categories.find(c => c.id === id);
    if (!c) return id.substring(0, 4).toUpperCase();
    return (lang === "pl" ? c.pl : c.en).substring(0, 4).toUpperCase();
  };

  const colPct      = 100 / windowDays;
  const lanesHeight = rowLayout.totalHeight;
  const rangeLabel  = days.length > 1 ? fmtRange(windowStartIso, windowEndIso, lang) : windowStartIso;

  const statusLabels = {
    pl: { NotStarted: "Nie rozpoczęto", InProgress: "W trakcie", Done: "Wykonane", Blocked: "Zablokowane" },
    en: { NotStarted: "To do",          InProgress: "In progress", Done: "Done",   Blocked: "Blocked"     },
  };

  const dotColors = {
    NotStarted: "bg-status-todo",
    InProgress:  "bg-status-progress",
    Done:        "bg-status-done",
    Blocked:     "bg-status-cancelled",
  };

  return (
    <div className="bg-card border border-border rounded-[10px] overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-3.5 py-2.5 border-b border-border bg-secondary">
        <Button variant="outline" size="icon" onClick={() => shiftBy(-windowDays)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="inline-flex bg-secondary border border-border rounded-md p-[2px] gap-0.5">
          {STEP_OPTIONS.map(s => (
            <button
              key={s}
              className={cn(
                "h-[26px] min-w-9 px-2.5 rounded text-[11.5px] font-semibold transition-all",
                windowDays === s
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => changeStep(s)}
            >
              {s}d
            </button>
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={() => shiftBy(windowDays)}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-1.5 text-[12px]">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>{rangeLabel}</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto">
            <MiniCalendar lang={lang} selected={windowStartIso} onSelect={focusOnDate} onClose={() => {}} />
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="sm" onClick={() => focusOnDate(todayIso)}>
          {lang === "pl" ? "Dziś" : "Today"}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => focusOnDate(FESTIVAL_START)}>
          {lang === "pl" ? "Festiwal" : "Festival"}
        </Button>

        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[11px] text-muted-foreground">
            {dated.length} {lang === "pl" ? "zad." : "tasks"}
          </span>
          <Button
            size="sm"
            className="gap-1.5 text-[12px] h-7"
            onClick={() => setShowAddTask(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            {lang === "pl" ? "Dodaj zadanie" : "Add task"}
          </Button>
        </div>
      </div>

      {/* Gantt grid */}
      <div className="overflow-x-auto overflow-y-hidden">
        {/* Header row — spacer + day columns */}
        <div
          className="grid border-b border-border bg-secondary sticky top-0 z-[5] min-w-max"
          style={{ gridTemplateColumns: `${LABEL_COL_W}px repeat(${windowDays}, minmax(140px, 1fr))` }}
        >
          {/* Spacer for status label column */}
          <div className="border-r border-border" />
          {days.map(d => {
            const iso = isoDate(d); const dow = d.getDay(); const dayIdx = dow === 0 ? 6 : dow - 1;
            return (
              <div
                key={iso}
                className={cn(
                  "px-1.5 py-2 text-center border-l border-border font-mono text-muted-foreground relative",
                  isFestival(iso) && "bg-accent text-accent-foreground",
                  isWeekend(d) && !isFestival(iso) && "bg-background",
                  iso === todayIso && "after:absolute after:bottom-[-1px] after:left-1/4 after:right-1/4 after:h-0.5 after:bg-ring after:content-['']",
                  iso === pulseIso && "gantt-pulse-head",
                )}
              >
                <div className="text-[9.5px] font-semibold uppercase tracking-wide">{dayLabels[dayIdx]}</div>
                <div className="text-[16px] font-bold mt-0.5 tracking-tight">{d.getDate()}</div>
              </div>
            );
          })}
        </div>

        {/* Body — left status labels + right day grid */}
        <div className="flex min-w-max">
          {/* Status label column */}
          <div
            className="flex-shrink-0 border-r border-border bg-secondary/20 z-[4]"
            style={{ width: LABEL_COL_W }}
          >
            {GANTT_STATUSES.map((s, i) => (
              <div
                key={s}
                className={cn("flex flex-col justify-center gap-1 px-2.5 border-b border-border", i % 2 === 1 && "bg-secondary/30")}
                style={{ height: rowLayout.heights[s] }}
              >
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-wide leading-tight"
                  style={{ color: STATUS_COLORS[s]?.border }}
                >
                  {statusLabels[lang][s]}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {dated.filter(t => t.status === s).length}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns grid */}
          <div
            className="relative grid flex-1"
            style={{
              gridTemplateColumns: `repeat(${windowDays}, minmax(140px, 1fr))`,
              height: lanesHeight,
            }}
          >
            {/* Column backgrounds */}
            {days.map(d => {
              const iso = isoDate(d);
              return (
                <div
                  key={iso}
                  className={cn(
                    "border-l border-border first:border-l-0",
                    isFestival(iso) && "opacity-35 bg-accent",
                    isWeekend(d) && !isFestival(iso) && "bg-secondary",
                    iso === pulseIso && "gantt-pulse",
                  )}
                  style={{ gridRow: 1 }}
                />
              );
            })}

            {/* Horizontal row dividers */}
            {GANTT_STATUSES.map((s, i) => (
              <div
                key={s}
                className={cn("absolute left-0 right-0 border-b border-border", i % 2 === 1 && "bg-secondary/20")}
                style={{ top: rowLayout.tops[s], height: rowLayout.heights[s], pointerEvents: 'none' }}
              />
            ))}

            {dated.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[13px]">
                {lang === "pl" ? "Brak zadań w tym oknie czasowym" : "No tasks in this time window"}
              </div>
            )}

            {/* Task cards */}
            {dated.map(task => {
              if (!GANTT_STATUSES.includes(task.status)) return null;
              const dayIdx  = days.findIndex(d => isoDate(d) === task.completeDate);
              if (dayIdx < 0) return null;
              const laneIdx = laneMap[task.id] ?? 0;
              const cardTop = rowLayout.tops[task.status] + ROW_PAD + laneIdx * (CARD_H + CARD_GAP);
              const title   = task.task;
              const colors  = STATUS_COLORS[task.status] ?? STATUS_COLORS.NotStarted;
              return (
                <div
                  key={task.id}
                  className="group absolute rounded-md border flex flex-col gap-1 px-2.5 py-2 cursor-default transition-transform hover:-translate-y-px z-[3]"
                  style={{
                    left:            `calc(${dayIdx * colPct}% + 3px)`,
                    width:           `calc(${colPct}% - 6px)`,
                    top:             cardTop,
                    height:          CARD_H,
                    borderLeftWidth: 3,
                    borderLeftColor: colors.border,
                    background:      colors.bg,
                    borderColor:     "var(--border)",
                    boxShadow:       "var(--shadow-sm)",
                  }}
                >
                  <div className="flex items-start gap-1 min-w-0">
                    <p className="text-[12px] font-medium text-foreground leading-snug line-clamp-2 flex-1 min-w-0" title={title}>{title}</p>
                    <TaskCardMenu
                      task={task}
                      lang={lang}
                      onView={() => setViewTask(task)}
                      onEdit={() => setEditTask(task)}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {task.who.length === 0 ? (
                      <span className="font-mono text-[10.5px] text-muted-foreground italic border border-dashed border-border px-1.5 py-0.5 rounded">
                        {lang === "pl" ? "Nieprzypisane" : "Unassigned"}
                      </span>
                    ) : task.who.map(w => (
                      <span key={typeof w === 'object' ? w.id : w} className="font-mono text-[10.5px] bg-card/60 text-muted-foreground px-1.5 py-0.5 rounded">
                        {typeof w === 'object' ? w.displayName : w}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[9.5px] font-semibold uppercase tracking-wide text-muted-foreground bg-card/60 self-start px-1.5 py-0.5 rounded">
                    {getCatLabel(task.category)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {editTask && (
        <TaskModal
          mode="edit"
          task={editTask}
          people={people}
          onClose={() => setEditTask(null)}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setEditTask(null);
          }}
        />
      )}

      {showAddTask && (
        <TaskModal
          mode="add"
          people={people}
          onClose={() => setShowAddTask(false)}
          onSave={() => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setShowAddTask(false);
          }}
        />
      )}

      {viewTask && (
        <TaskModal
          mode="view"
          task={viewTask}
          people={people}
          onClose={() => setViewTask(null)}
          onSave={() => setViewTask(null)}
        />
      )}
    </div>
  );
};

export default Harmonogram;
