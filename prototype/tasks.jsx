/* global React, I18N, utils, FESTIVAL_DATA, UI */
const { useState, useMemo, useEffect, useRef } = React;

// ============ MultiSelect ============
function MultiSelect({ label, options, values, onChange, lang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const toggle = (v) => {
    if (values.includes(v)) onChange(values.filter(x => x !== v));
    else onChange([...values, v]);
  };
  const clear = (e) => { e.stopPropagation(); onChange([]); };

  const buttonLabel = values.length === 0
    ? `${I18N[lang].all} — ${label}`
    : values.length === 1
      ? (options.find(o => o.value === values[0])?.label || values[0])
      : `${label}: ${values.length}`;

  return (
    <div className="ms" ref={ref}>
      <button type="button" className="ms__btn" data-open={open} onClick={() => setOpen(!open)}>
        <span className="ms__btn-label">{buttonLabel}</span>
        {values.length > 0 && (
          <span className="ms__clear" onClick={clear} title={lang === "pl" ? "Wyczyść" : "Clear"}>×</span>
        )}
        <svg className="ms__caret" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 3 3-3"/></svg>
      </button>
      {open && (
        <div className="ms__menu">
          {options.map(opt => {
            const checked = values.includes(opt.value);
            return (
              <div key={opt.value} className="ms__item" data-checked={checked} onClick={() => toggle(opt.value)}>
                <span className="ms__check">
                  {checked && <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>}
                </span>
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TasksSection({ lang, tasks, setTasks, filterPersons, setFilterPersons, filterCategories, setFilterCategories, query, setQuery }) {
  const t = I18N[lang];
  const [tab, setTab] = useState("list");

  const filtered = useMemo(() => {
    return tasks.filter(task => {
      if (filterPersons.length > 0 && !task.who.some(w => filterPersons.includes(w))) return false;
      if (filterCategories.length > 0 && !filterCategories.includes(task.category)) return false;
      if (query) {
        const q = query.toLowerCase();
        const txt = (lang === "pl" ? task.task : task.taskEn).toLowerCase();
        if (!txt.includes(q) && !(task.note || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [tasks, filterPersons, filterCategories, query, lang]);

  const grouped = useMemo(() => {
    const order = ["in-progress", "todo", "done", "cancelled"];
    const g = {};
    order.forEach(s => g[s] = []);
    filtered.forEach(task => g[task.status].push(task));
    Object.values(g).forEach(arr => arr.sort((a,b) => {
      if (!a.date) return 1; if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    }));
    return g;
  }, [filtered]);

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t));
  };

  return (
    <>
      <div className="tabs">
        <button data-active={tab === "list"} onClick={() => setTab("list")}>{t.tabList}</button>
        <button data-active={tab === "gantt"} onClick={() => setTab("gantt")}>{t.tabGantt}</button>
      </div>

      <div className="filterbar">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 30 }} />
          <div style={{ position: "absolute", left: 9, top: 8, color: "var(--text-dim)" }}>
            <UI.IconSearch />
          </div>
        </div>
        <MultiSelect
          label={t.person}
          values={filterPersons}
          onChange={setFilterPersons}
          options={FESTIVAL_DATA.PEOPLE.map(p => ({ value: p, label: p }))}
          lang={lang} />
        <MultiSelect
          label={t.category}
          values={filterCategories}
          onChange={setFilterCategories}
          options={FESTIVAL_DATA.CATEGORIES.map(c => ({ value: c.id, label: c[lang] }))}
          lang={lang} />
      </div>

      {tab === "list" ? (
        <TaskList grouped={grouped} lang={lang} toggleStatus={toggleStatus} />
      ) : (
        <Gantt tasks={filtered} lang={lang} />
      )}
    </>
  );
}

function TaskList({ grouped, lang, toggleStatus }) {
  return (
    <>
      {Object.entries(grouped).map(([status, items]) => {
        if (items.length === 0) return null;
        return (
          <div className="task-group" key={status}>
            <div className="task-group__head">
              <UI.StatusPill status={status} lang={lang} />
              <span className="task-group__count">{items.length}</span>
              <div className="task-group__bar"></div>
            </div>
            <div className="task-list">
              {items.map(task => (
                <TaskRow key={task.id} task={task} lang={lang} toggleStatus={toggleStatus} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

function TaskRow({ task, lang, toggleStatus }) {
  const t = I18N[lang];
  const cat = FESTIVAL_DATA.CATEGORIES.find(c => c.id === task.category);
  const isDone = task.status === "done";
  const overdue = task.date && task.date < utils.isoDate(utils.TODAY) && task.status !== "done" && task.status !== "cancelled";

  return (
    <div className="task-row">
      <div
        className="task-row__check"
        data-checked={isDone}
        onClick={() => toggleStatus(task.id)}>
        {isDone && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>}
      </div>
      <div>
        <div className={"task-row__title" + (isDone ? " task-row__title--done" : "")}>
          {lang === "pl" ? task.task : task.taskEn}
        </div>
        {task.note && <div className="task-row__note">{task.note}</div>}
      </div>
      <div>{cat && <span className="cat-tag">{cat[lang]}</span>}</div>
      <div>
        <UI.Avatars people={task.who} />
      </div>
      <div className={"task-row__date" + (overdue ? " task-row__date--overdue" : "")}>
        {task.date ? utils.fmtDate(task.date, lang) : t.noDate}
        {overdue && <div style={{ fontSize: 9, marginTop: 1 }}>{t.overdue}</div>}
      </div>
      <button className="task-row__menu"><UI.IconDots /></button>
    </div>
  );
}

// ============ Gantt — adjustable window (3/7/14d), paginated ============
const STEP_OPTIONS = [3, 7, 14];
const LS_STEP = "ptl.gantt.step";
const LS_START = "ptl.gantt.start";

function loadInitialStart() {
  try {
    const v = localStorage.getItem(LS_START);
    if (v) {
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
    }
  } catch (e) {}
  return new Date(2025, 7, 1);
}
function loadInitialStep() {
  try {
    const v = parseInt(localStorage.getItem(LS_STEP), 10);
    if (STEP_OPTIONS.includes(v)) return v;
  } catch (e) {}
  return 14;
}

function MiniCalendar({ value, onPick, lang }) {
  const t = I18N[lang];
  const [view, setView] = useState(() => {
    const d = new Date(value);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const monthDays = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const last = new Date(view.getFullYear(), view.getMonth() + 1, 0);
    // Monday-first offset
    const offset = (first.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const valIso = utils.isoDate(value);
  const todayIso = utils.isoDate(utils.TODAY);
  const dayLabels = lang === "pl"
    ? ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"]
    : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div className="cal">
      <div className="cal__head">
        <button
          type="button"
          className="cal__nav"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          title={lang === "pl" ? "Poprzedni miesiąc" : "Previous month"}>‹</button>
        <span className="cal__title">{t.months[view.getMonth()]} {view.getFullYear()}</span>
        <button
          type="button"
          className="cal__nav"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          title={lang === "pl" ? "Następny miesiąc" : "Next month"}>›</button>
      </div>
      <div className="cal__grid cal__grid--labels">
        {dayLabels.map(d => <span key={d} className="cal__label">{d}</span>)}
      </div>
      <div className="cal__grid">
        {monthDays.map((d, i) => {
          if (!d) return <span key={i} className="cal__cell cal__cell--blank"></span>;
          const iso = utils.isoDate(d);
          const isWk = d.getDay() === 0 || d.getDay() === 6;
          const isFest = iso === "2025-08-08" || iso === "2025-08-09";
          return (
            <button
              type="button"
              key={i}
              className={"cal__cell"
                + (isWk ? " cal__cell--weekend" : "")
                + (isFest ? " cal__cell--festival" : "")
                + (iso === todayIso ? " cal__cell--today" : "")
                + (iso === valIso ? " cal__cell--selected" : "")}
              onClick={() => onPick(d)}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="cal__foot">
        <button type="button" className="cal__preset" onClick={() => onPick(new Date(utils.TODAY))}>
          {lang === "pl" ? "Dziś" : "Today"}
        </button>
        <button type="button" className="cal__preset" onClick={() => onPick(new Date(2025, 7, 8))}>
          {lang === "pl" ? "Festiwal" : "Festival"}
        </button>
      </div>
    </div>
  );
}

function Gantt({ tasks, lang }) {
  const t = I18N[lang];
  const [windowStart, setWindowStart] = useState(loadInitialStart);
  const [windowDays, setWindowDays] = useState(loadInitialStep);
  const [calOpen, setCalOpen] = useState(false);
  const [pulseIso, setPulseIso] = useState(null);
  const calRef = useRef(null);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(LS_START, utils.isoDate(windowStart)); } catch (e) {}
  }, [windowStart]);
  useEffect(() => {
    try { localStorage.setItem(LS_STEP, String(windowDays)); } catch (e) {}
  }, [windowDays]);

  // Close calendar on outside click
  useEffect(() => {
    if (!calOpen) return;
    const onDoc = (e) => { if (calRef.current && !calRef.current.contains(e.target)) setCalOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [calOpen]);

  // Clear pulse after animation
  useEffect(() => {
    if (!pulseIso) return;
    const id = setTimeout(() => setPulseIso(null), 1800);
    return () => clearTimeout(id);
  }, [pulseIso]);

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < windowDays; i++) {
      const d = new Date(windowStart);
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [windowStart, windowDays]);

  const windowEnd = days[days.length - 1];
  const windowStartIso = utils.isoDate(windowStart);
  const windowEndIso = utils.isoDate(windowEnd);

  const dated = tasks.filter(task => task.date && task.date >= windowStartIso && task.date <= windowEndIso)
    .sort((a, b) => a.date.localeCompare(b.date));

  const festStartIdx = days.findIndex(d => utils.isoDate(d) === "2025-08-08");
  const festEndIdx = days.findIndex(d => utils.isoDate(d) === "2025-08-09");

  const colPct = 100 / windowDays;

  const shiftBy = (d) => {
    const ns = new Date(windowStart);
    ns.setDate(ns.getDate() + d);
    setWindowStart(ns);
  };

  // Center the window on a target date (and pulse it)
  const focusOnDate = (target) => {
    const d = new Date(target);
    d.setHours(0, 0, 0, 0);
    const half = Math.floor(windowDays / 2);
    const ns = new Date(d);
    ns.setDate(ns.getDate() - half);
    setWindowStart(ns);
    setPulseIso(utils.isoDate(d));
  };

  const labelMonth = (d) => `${t.months[d.getMonth()]} ${d.getFullYear()}`;
  const rangeLabel = windowDays === 1
    ? `${days[0].getDate()} ${labelMonth(days[0])}`
    : days[0].getMonth() === windowEnd.getMonth()
      ? `${days[0].getDate()}–${windowEnd.getDate()} ${labelMonth(windowEnd)}`
      : `${days[0].getDate()} ${t.months[days[0].getMonth()]} – ${windowEnd.getDate()} ${labelMonth(windowEnd)}`;

  // Card height grows with people; lanes height = card_count * row_height
  const ROW_HEIGHT = 120;
  const lanesHeight = Math.max(300 - 28, dated.length * ROW_HEIGHT + 12);

  return (
    <div className="gantt">
      <div className="gantt__legend">
        <button className="icon-btn" onClick={() => shiftBy(-windowDays)} title={lang==="pl"?`Poprzednie ${windowDays} dni`:`Previous ${windowDays} days`}>‹</button>

        <div className="seg" role="group" aria-label={lang === "pl" ? "Krok widoku" : "View step"}>
          {STEP_OPTIONS.map(n => (
            <button
              key={n}
              type="button"
              className="seg__btn"
              data-active={windowDays === n}
              onClick={() => setWindowDays(n)}>
              {n}d
            </button>
          ))}
        </div>

        <button className="icon-btn" onClick={() => shiftBy(windowDays)} title={lang==="pl"?`Następne ${windowDays} dni`:`Next ${windowDays} days`}>›</button>

        <div className="cal-wrap" ref={calRef}>
          <button
            type="button"
            className="gantt__date-btn"
            data-open={calOpen}
            onClick={() => setCalOpen(!calOpen)}
            title={lang === "pl" ? "Wybierz datę" : "Pick a date"}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M2 6h12M5.5 1.5v3M10.5 1.5v3"/></svg>
            <span>{rangeLabel}</span>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 3 3-3"/></svg>
          </button>
          {calOpen && (
            <div className="cal-popover">
              <MiniCalendar
                value={windowStart}
                lang={lang}
                onPick={(d) => { focusOnDate(d); setCalOpen(false); }} />
            </div>
          )}
        </div>

        <button className="icon-btn" onClick={() => focusOnDate(utils.TODAY)} title={lang==="pl"?"Skok do dziś":"Jump to today"}>
          {lang === "pl" ? "Dziś" : "Today"}
        </button>
        <button className="icon-btn" onClick={() => focusOnDate(new Date(2025, 7, 8))} title={lang==="pl"?"Tydzień festiwalu":"Festival week"}>
          {lang === "pl" ? "Festiwal" : "Festival"}
        </button>

        <span style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center" }}>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-todo)" }}></span>{t.statusTodo}</span>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-progress)" }}></span>{t.statusInProgress}</span>
          <span><span className="gantt__legend-dot" style={{ background: "var(--status-done)" }}></span>{t.statusDone}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            {dated.length} {lang === "pl" ? "zad." : "tasks"}
          </span>
        </span>
      </div>

      <div className="gantt14" style={{ "--gantt14-cols": windowDays }}>
        <div className="gantt14__head" style={{ gridTemplateColumns: `repeat(${windowDays}, 1fr)` }}>
          {days.map((d, i) => {
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const iso = utils.isoDate(d);
            const isFest = iso === "2025-08-08" || iso === "2025-08-09";
            const isToday = iso === utils.isoDate(utils.TODAY);
            const isPulse = iso === pulseIso;
            return (
              <div key={i} className={"gantt__day"
                  + (isWeekend ? " gantt__day--weekend" : "")
                  + (isFest ? " gantt__day--festival" : "")
                  + (isToday ? " gantt__day--today" : "")
                  + (isPulse ? " gantt__day--pulse" : "")}>
                <span className="gantt__day-name">{t.days[(d.getDay() + 6) % 7]}</span>
                <span className="gantt__day-num">{d.getDate()}</span>
              </div>
            );
          })}
        </div>

        <div className="gantt14__body" style={{ gridTemplateColumns: `repeat(${windowDays}, 1fr)`, minHeight: lanesHeight + 28 }}>
          {days.map((d, i) => {
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const iso = utils.isoDate(d);
            const isFest = iso === "2025-08-08" || iso === "2025-08-09";
            const isPulse = iso === pulseIso;
            return (
              <div key={i} className={"gantt14__col"
                  + (isWeekend ? " gantt14__col--weekend" : "")
                  + (isFest ? " gantt14__col--festival" : "")
                  + (isPulse ? " gantt14__col--pulse" : "")}></div>
            );
          })}

          {festStartIdx >= 0 && (
            <div className="gantt14__festival-label" style={{
              left: `${festStartIdx * colPct}%`,
              width: `${(festEndIdx - festStartIdx + 1) * colPct}%`,
            }}>
              {lang === "pl" ? "Festiwal" : "Festival"}
            </div>
          )}

          <div className="gantt14__lanes" style={{ height: lanesHeight }}>
            {dated.length === 0 && (
              <div className="empty" style={{ padding: 60 }}>
                {lang === "pl" ? "Brak zadań w tym oknie" : "No tasks in this window"}
              </div>
            )}
            {dated.map((task, idx) => {
              const dayIdx = days.findIndex(d => utils.isoDate(d) === task.date);
              if (dayIdx < 0) return null;
              const dur = task.category === "build" || task.category === "site" ? 2 : 1;
              const span = Math.min(dur, windowDays - dayIdx);
              const cat = FESTIVAL_DATA.CATEGORIES.find(c => c.id === task.category);
              return (
                <div
                  key={task.id}
                  className={"gantt14__card gantt14__card--" + task.status}
                  style={{
                    left: `${dayIdx * colPct}%`,
                    width: `calc(${span * colPct}% - 6px)`,
                    top: idx * ROW_HEIGHT,
                  }}
                  title={lang === "pl" ? task.task : task.taskEn}>
                  <div className="gantt14__card-title">
                    {lang === "pl" ? task.task : task.taskEn}
                  </div>
                  <div className="gantt14__card-people">
                    {task.who.length > 0 ? task.who.map(p => (
                      <span key={p} className="gantt14__person">{p}</span>
                    )) : (
                      <span className="gantt14__person gantt14__person--empty">
                        {lang === "pl" ? "Nieprzypisane" : "Unassigned"}
                      </span>
                    )}
                  </div>
                  {cat && <div className="gantt14__card-cat">{cat[lang]}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

window.TasksSection = TasksSection;
