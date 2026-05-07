import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, ChevronDown, MoreHorizontal, Pencil, Trash2, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TASK_CATEGORIES } from '../data/tasks';
import { TODAY, isoDate, parseISO } from '../data/utils';
import { Button } from './ui/button';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { cn } from '../lib/utils';

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

const STATUS_COLORS = {
  "todo":        { border: "var(--status-todo)",     bg: "var(--status-todo-bg)"     },
  "in-progress": { border: "var(--status-progress)", bg: "var(--status-progress-bg)" },
  "done":        { border: "var(--status-done)",     bg: "var(--status-done-bg)"     },
  "cancelled":   { border: "var(--status-cancelled)",bg: "var(--status-cancelled-bg)"},
};

const Harmonogram = ({ lang, tasks }) => {
  const { setTasks } = useAppContext();
  const [windowStart, setWindowStart] = useState(loadInitialStart);
  const [windowDays,  setWindowDays]  = useState(loadInitialStep);
  const [pulseIso,    setPulseIso]    = useState(null);

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
      .filter(t => t.date && t.date >= windowStartIso && t.date <= windowEndIso)
      .sort((a, b) => a.date.localeCompare(b.date))
  ), [tasks, windowStartIso, windowEndIso]);

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
  const lanesHeight = Math.max(272, dated.length * ROW_HEIGHT + 28);
  const rangeLabel  = days.length > 1 ? fmtRange(windowStartIso, windowEndIso, lang) : windowStartIso;

  const statusLabels = {
    pl: { todo: "Nie rozpoczęto", "in-progress": "W trakcie", done: "Wykonane" },
    en: { todo: "To do",          "in-progress": "In progress", done: "Done"   },
  };

  const dotColors = {
    "todo":        "bg-status-todo",
    "in-progress": "bg-status-progress",
    "done":        "bg-status-done",
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
          {["todo", "in-progress", "done"].map(s => (
            <span key={s} className="flex items-center gap-1.5">
              <span className={cn("w-2.5 h-2.5 rounded-sm", dotColors[s])} />
              <span className="text-[11px] text-muted-foreground">{statusLabels[lang][s]}</span>
            </span>
          ))}
          <span className="font-mono text-[11px] text-muted-foreground">
            {dated.length} {lang === "pl" ? "zad." : "tasks"}
          </span>
        </div>
      </div>

      {/* Gantt grid */}
      <div className="overflow-x-auto overflow-y-hidden">
        {/* Header row */}
        <div
          className="grid border-b border-border bg-secondary sticky top-0 z-[5] min-w-max"
          style={{ gridTemplateColumns: `repeat(${windowDays}, minmax(140px, 1fr))` }}
        >
          {days.map(d => {
            const iso = isoDate(d); const dow = d.getDay(); const dayIdx = dow === 0 ? 6 : dow - 1;
            return (
              <div
                key={iso}
                className={cn(
                  "px-1.5 py-2 text-center border-l border-border first:border-l-0 font-mono text-muted-foreground relative",
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

        {/* Body */}
        <div
          className="relative grid min-w-max"
          style={{
            gridTemplateColumns: `repeat(${windowDays}, minmax(140px, 1fr))`,
            minHeight: lanesHeight,
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

          {dated.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[13px]">
              {lang === "pl" ? "Brak zadań w tym oknie czasowym" : "No tasks in this time window"}
            </div>
          )}

          {/* Task cards */}
          {dated.map((task, idx) => {
            const dayIdx = days.findIndex(d => isoDate(d) === task.date);
            if (dayIdx < 0) return null;
            const dur  = (task.category === "build" || task.category === "site") ? 2 : 1;
            const span = Math.min(dur, windowDays - dayIdx);
            const title = task.task;
            const colors = STATUS_COLORS[task.status] ?? STATUS_COLORS.todo;
            return (
              <div
                key={task.id}
                className="group absolute rounded-md border flex flex-col gap-1 px-2.5 py-2 cursor-default transition-transform hover:-translate-y-px z-[3]"
                style={{
                  left:            `calc(${dayIdx * colPct}% + 3px)`,
                  width:           `calc(${span   * colPct}% - 6px)`,
                  top:             idx * ROW_HEIGHT + 14,
                  height:          110,
                  borderLeftWidth: 3,
                  borderLeftColor: colors.border,
                  background:      colors.bg,
                  borderColor:     "var(--border)",
                  boxShadow:       "var(--shadow-sm)",
                }}
              >
                {/* Title row + context menu */}
                <div className="flex items-start gap-1 min-w-0">
                  <p className="text-[12px] font-medium text-foreground leading-snug line-clamp-2 flex-1 min-w-0" title={title}>{title}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="shrink-0 h-5 w-5 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:bg-black/10 dark:hover:bg-white/10"
                        onClick={e => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-1" align="end" sideOffset={4}>
                      <button
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground"
                        onClick={() => alert(lang === "pl" ? "Szczegóły zadania (wkrótce)" : "Task details (coming soon)")}
                      >
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                        {lang === "pl" ? "Szczegóły" : "Details"}
                      </button>
                      <div className="my-1 h-px bg-border" />
                      <button
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-foreground"
                        onClick={() => alert(lang === "pl" ? "Edycja zadania (wkrótce)" : "Edit task (coming soon)")}
                      >
                        <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        {lang === "pl" ? "Edytuj" : "Edit"}
                      </button>
                      <button
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] rounded hover:bg-secondary transition-colors text-[oklch(0.55_0.2_27)]"
                        onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {lang === "pl" ? "Usuń" : "Delete"}
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {task.who.length === 0 ? (
                    <span className="font-mono text-[10.5px] text-muted-foreground italic border border-dashed border-border px-1.5 py-0.5 rounded">
                      {lang === "pl" ? "Nieprzypisane" : "Unassigned"}
                    </span>
                  ) : task.who.map(w => (
                    <span key={w} className="font-mono text-[10.5px] bg-card/60 text-muted-foreground px-1.5 py-0.5 rounded">
                      {w}
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
  );
};

export default Harmonogram;
