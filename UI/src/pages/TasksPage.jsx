import React, { useState, useMemo } from 'react';
import { I18N } from '../data/festival';
import { StatusPill } from '../components/Layout';
import { IconSearch } from '../components/Icons';
import Harmonogram from '../components/Harmonogram';
import { useAppContext } from '../context/AppContext';

const TasksPage = () => {
  const {
    lang, tasks, setTasks,
    filterPersons,    setFilterPersons,
    filterCategories, setFilterCategories,
    tasksQuery: query, setTasksQuery: setQuery,
  } = useAppContext();

  const t = I18N[lang];
  const [tab, setTab] = useState("list");

  const filtered = useMemo(() => tasks.filter(task => {
    if (filterPersons.length > 0 && !task.who.some(w => filterPersons.includes(w))) return false;
    if (filterCategories.length > 0 && !filterCategories.includes(task.category))    return false;
    if (query) {
      const q   = query.toLowerCase();
      const txt = (lang === "pl" ? task.task : task.taskEn).toLowerCase();
      if (!txt.includes(q) && !(task.note || "").toLowerCase().includes(q)) return false;
    }
    return true;
  }), [tasks, filterPersons, filterCategories, query, lang]);

  const grouped = useMemo(() => {
    const order = ["in-progress", "todo", "done", "cancelled"];
    const g = {};
    order.forEach(s => (g[s] = []));
    filtered.forEach(task => g[task.status].push(task));
    Object.values(g).forEach(arr =>
      arr.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
      })
    );
    return g;
  }, [filtered]);

  const toggleStatus = (id) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t));

  return (
    <>
      <div className="tabs">
        <button data-active={tab === "list"}  onClick={() => setTab("list")}>
          {t.tabList}
        </button>
        <button data-active={tab === "gantt"} onClick={() => setTab("gantt")}>
          {t.tabGantt}
        </button>
      </div>

      <div className="filterbar">
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 30 }}
          />
          <div style={{ position: "absolute", left: 9, top: 8, color: "var(--text-dim)" }}>
            <IconSearch />
          </div>
        </div>
      </div>

      {tab === "list" ? (
        <>
          {Object.entries(grouped).map(([status, items]) => {
            if (items.length === 0) return null;
            return (
              <div className="task-group" key={status}>
                <div className="task-group__head">
                  <StatusPill status={status} lang={lang} />
                  <span className="task-group__count">{items.length}</span>
                  <div className="task-group__bar" />
                </div>
                <div className="task-list">
                  {items.map(task => (
                    <div key={task.id} className="task-row">
                      <input
                        type="checkbox"
                        checked={task.status === "done"}
                        onChange={() => toggleStatus(task.id)}
                        style={{ width: 18, height: 18 }}
                      />
                      <div
                        className="task-row__title"
                        style={task.status === "done"
                          ? { textDecoration: "line-through", color: "var(--text-muted)" }
                          : {}}
                      >
                        {lang === "pl" ? task.task : task.taskEn}
                        {task.note && <div className="task-row__note">{task.note}</div>}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-muted)" }}>
                        {task.date || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <Harmonogram lang={lang} tasks={filtered} />
      )}
    </>
  );
};

export default TasksPage;
