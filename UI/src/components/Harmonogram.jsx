import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FESTIVAL_DATA } from '../data/festival';
import { TODAY, isoDate, parseISO } from '../data/utils';

const FESTIVAL_START = "2025-08-08";
const FESTIVAL_END = "2025-08-09";
const STEP_OPTIONS = [3, 7, 14];
const ROW_HEIGHT = 120;
const LS_STEP = "ptl.gantt.step";
const LS_START = "ptl.gantt.start";

const PL_DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];
const EN_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PL_MONTHS = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const EN_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PL_MONTHS_SHORT = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
const EN_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function isFestival(iso) {
  return iso === FESTIVAL_START || iso === FESTIVAL_END;
}

function isWeekend(d) {
  const dow = d.getDay();
  return dow === 0 || dow === 6;
}

function fmtRange(startIso, endIso, lang) {
  const s = parseISO(startIso);
  const e = parseISO(endIso);
  const mShort = lang === "pl" ? PL_MONTHS_SHORT : EN_MONTHS_SHORT;
  if (lang === "pl") {
    if (s.getMonth() === e.getMonth())
      return `${s.getDate()}–${e.getDate()} ${mShort[s.getMonth()]} ${s.getFullYear()}`;
    return `${s.getDate()} ${mShort[s.getMonth()]} – ${e.getDate()} ${mShort[e.getMonth()]} ${e.getFullYear()}`;
  }
  if (s.getMonth() === e.getMonth())
    return `${mShort[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`;
  return `${mShort[s.getMonth()]} ${s.getDate()} – ${mShort[e.getMonth()]} ${e.getDate()}, ${e.getFullYear()}`;
}

function loadInitialStep() {
  try {
    const v = parseInt(localStorage.getItem(LS_STEP), 10);
    if (STEP_OPTIONS.includes(v)) return v;
  } catch (e) {}
  return 14;
}

function loadInitialStart() {
  try {
    const v = localStorage.getItem(LS_START);
    if (v) {
      const d = parseISO(v);
      if (d && !isNaN(d.getTime())) return d;
    }
  } catch (e) {}
  const d = parseISO(FESTIVAL_START);
  d.setDate(d.getDate() - 5);
  return d;
}

function MiniCalendar({ lang, selected, onSelect, onClose }) {
  const initial = parseISO(selected) || new Date(TODAY);
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const todayIso = isoDate(TODAY);
  const months = lang === "pl" ? PL_MONTHS : EN_MONTHS;
  const dayLabels = lang === "pl"
    ? ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"]
    : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const year = view.getFullYear();
  const month = view.getMonth();

  const firstDay = new Date(year, month, 1);
  let offset = firstDay.getDay() - 1;
  if (offset < 0) offset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const shiftMonth = (n) => setView(v => new Date(v.getFullYear(), v.getMonth() + n, 1));

  return (
    <div className="cal-popover">
      <div className="cal-popover__head">
        <button className="icon-btn" style={{ minWidth: 28, height: 28 }} onClick={() => shiftMonth(-1)}>‹</button>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{months[month]} {year}</span>
        <button className="icon-btn" style={{ minWidth: 28, height: 28 }} onClick={() => shiftMonth(1)}>›</button>
      </div>
      <div className="cal-popover__grid">
        {dayLabels.map(d => (
          <div key={d} className="cal-popover__label">{d}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={`b${i}`} />;
          const iso = isoDate(date);
          const dow = date.getDay();
          const weekend = dow === 0 || dow === 6;
          let cls = "cal-popover__day";
          if (weekend) cls += " cal-popover__day--weekend";
          if (isFestival(iso)) cls += " cal-popover__day--festival";
          if (iso === todayIso) cls += " cal-popover__day--today";
          if (iso === selected) cls += " cal-popover__day--selected";
          return (
            <button key={iso} className={cls} onClick={() => { onSelect(iso); onClose(); }}>
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <div className="cal-popover__footer">
        <button className="btn-sm" onClick={() => { onSelect(todayIso); onClose(); }}>
          {lang === "pl" ? "Dziś" : "Today"}
        </button>
        <button className="btn-sm" onClick={() => { onSelect(FESTIVAL_START); onClose(); }}>
          {lang === "pl" ? "Festiwal" : "Festival"}
        </button>
      </div>
    </div>
  );
}

const Harmonogram = ({ lang, tasks }) => {
  const [windowStart, setWindowStart] = useState(loadInitialStart);
  const [windowDays, setWindowDays] = useState(loadInitialStep);
  const [calOpen, setCalOpen] = useState(false);
  const [pulseIso, setPulseIso] = useState(null);
  const calRef = useRef(null);

  useEffect(() => {
    try { localStorage.setItem(LS_STEP, String(windowDays)); } catch (e) {}
  }, [windowDays]);

  useEffect(() => {
    try { localStorage.setItem(LS_START, isoDate(windowStart)); } catch (e) {}
  }, [windowStart]);

  useEffect(() => {
    if (!calOpen) return;
    const onDoc = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [calOpen]);

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

  const shiftBy = (d) => {
    const ns = new Date(windowStart);
    ns.setDate(ns.getDate() + d);
    setWindowStart(ns);
  };

  const focusOnDate = (iso) => {
    const d    = parseISO(iso);
    const half = Math.floor(windowDays / 2);
    const ns   = new Date(d);
    ns.setDate(ns.getDate() - half);
    setWindowStart(ns);
    setPulseIso(iso);
  };

  const changeStep = (newStep) => {
    const mid = new Date(windowStart);
    mid.setDate(mid.getDate() + Math.floor(windowDays / 2));
    const ns = new Date(mid);
    ns.setDate(ns.getDate() - Math.floor(newStep / 2));
    setWindowDays(newStep);
    setWindowStart(ns);
  };

  const dayLabels  = lang === "pl" ? PL_DAYS : EN_DAYS;
  const categories = FESTIVAL_DATA.CATEGORIES;

  const getCatLabel = (id) => {
    const c = categories.find(c => c.id === id);
    if (!c) return id.substring(0, 4).toUpperCase();
    return (lang === "pl" ? c.pl : c.en).substring(0, 4).toUpperCase();
  };

  const colPct      = 100 / windowDays;
  const lanesHeight = Math.max(272, dated.length * ROW_HEIGHT + 28);
  const rangeLabel  = days.length > 1
    ? fmtRange(windowStartIso, windowEndIso, lang)
    : windowStartIso;

  const statusLabels = {
    pl: { todo: "Nie rozpoczęto", "in-progress": "W trakcie", done: "Wykonane" },
    en: { todo: "To do",          "in-progress": "In progress", done: "Done"   },
  };

  return (
    <div className="gantt card" style={{ padding: 0, overflow: "hidden" }}>
      {/* Toolbar */}
      <div className="gantt__legend">
        <button
          className="icon-btn"
          title={lang === "pl" ? `Poprzednie ${windowDays} dni` : `Previous ${windowDays} days`}
          onClick={() => shiftBy(-windowDays)}
        >‹</button>

        <div className="seg">
          {STEP_OPTIONS.map(s => (
            <button
              key={s}
              className="seg__btn"
              data-active={windowDays === s}
              onClick={() => changeStep(s)}
            >{s}d</button>
          ))}
        </div>

        <button
          className="icon-btn"
          title={lang === "pl" ? `Następne ${windowDays} dni` : `Next ${windowDays} days`}
          onClick={() => shiftBy(windowDays)}
        >›</button>

        <div className="gantt__date-wrap" ref={calRef}>
          <button className="gantt__date-btn" onClick={() => setCalOpen(v => !v)}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="1" y="2" width="12" height="11" rx="2"/>
              <path d="M1 6h12M5 1v2M9 1v2"/>
            </svg>
            <span>{rangeLabel}</span>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3l2.5 2.5L7 3"/>
            </svg>
          </button>
          {calOpen && (
            <MiniCalendar
              lang={lang}
              selected={windowStartIso}
              onSelect={focusOnDate}
              onClose={() => setCalOpen(false)}
            />
          )}
        </div>

        <button className="icon-btn" onClick={() => focusOnDate(todayIso)}>
          {lang === "pl" ? "Dziś" : "Today"}
        </button>
        <button className="icon-btn" onClick={() => focusOnDate(FESTIVAL_START)}>
          {lang === "pl" ? "Festiwal" : "Festival"}
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          {["todo", "in-progress", "done"].map(s => (
            <span key={s} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span className={`gantt__legend-dot gantt__legend-dot--${s}`} />
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                {statusLabels[lang][s]}
              </span>
            </span>
          ))}
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
            {dated.length} {lang === "pl" ? "zad." : "tasks"}
          </span>
        </div>
      </div>

      {/* Gantt grid */}
      <div className="gantt14">
        <div
          className="gantt14__head"
          style={{ gridTemplateColumns: `repeat(${windowDays}, minmax(140px, 1fr))` }}
        >
          {days.map(d => {
            const iso    = isoDate(d);
            const dow    = d.getDay();
            const dayIdx = dow === 0 ? 6 : dow - 1;
            let cls = "gantt__day";
            if (isFestival(iso))  cls += " gantt__day--festival";
            else if (isWeekend(d)) cls += " gantt__day--weekend";
            if (iso === todayIso) cls += " gantt__day--today";
            if (iso === pulseIso) cls += " gantt__day--pulse";
            return (
              <div key={iso} className={cls}>
                <div className="gantt__day-name">{dayLabels[dayIdx]}</div>
                <div className="gantt__day-num">{d.getDate()}</div>
              </div>
            );
          })}
        </div>

        <div
          className="gantt14__body"
          style={{
            gridTemplateColumns: `repeat(${windowDays}, minmax(140px, 1fr))`,
            minHeight: lanesHeight,
          }}
        >
          {days.map(d => {
            const iso = isoDate(d);
            let cls = "gantt14__col";
            if (isFestival(iso))  cls += " gantt14__col--festival";
            else if (isWeekend(d)) cls += " gantt14__col--weekend";
            if (iso === pulseIso) cls += " gantt14__col--pulse";
            return <div key={iso} className={cls} />;
          })}

          {dated.length === 0 && (
            <div style={{
              position: "absolute", inset: 0, display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "var(--text-muted)", fontSize: 13,
            }}>
              {lang === "pl" ? "Brak zadań w tym oknie czasowym" : "No tasks in this time window"}
            </div>
          )}

          {dated.map((task, idx) => {
            const dayIdx = days.findIndex(d => isoDate(d) === task.date);
            if (dayIdx < 0) return null;
            const dur  = (task.category === "build" || task.category === "site") ? 2 : 1;
            const span = Math.min(dur, windowDays - dayIdx);
            const title = lang === "pl" ? task.task : task.taskEn;
            return (
              <div
                key={task.id}
                className={`gantt14__card gantt14__card--${task.status}`}
                style={{
                  left:  `calc(${dayIdx * colPct}% + 3px)`,
                  width: `calc(${span   * colPct}% - 6px)`,
                  top:   idx * ROW_HEIGHT + 14,
                }}
                title={title}
              >
                <div className="gantt14__card-title">{title}</div>
                <div className="gantt14__card-people">
                  {task.who.length === 0 ? (
                    <span className="gantt14__card-unassigned">
                      {lang === "pl" ? "Nieprzypisane" : "Unassigned"}
                    </span>
                  ) : task.who.map(w => (
                    <span key={w} className="gantt14__card-person">{w}</span>
                  ))}
                </div>
                <div className="gantt14__card-cat">{getCatLabel(task.category)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Harmonogram;
