import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { I18N } from '../data/i18n';
import { PEOPLE, TASK_CATEGORIES } from '../data/tasks';
import { StatusPill } from '../components/Layout';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { MultiSelect } from '../components/ui/multi-select';
import Harmonogram from '../components/Harmonogram';
import { useAppContext } from '../context/AppContext';

const TasksPage = () => {
  const {
    lang, tasks, setTasks,
    filterPersons,    setFilterPersons,
    filterCategories, setFilterCategories,
    filterStatuses,   setFilterStatuses,
    tasksQuery: query, setTasksQuery: setQuery,
  } = useAppContext();

  const t = I18N[lang];

  const personOptions = PEOPLE.map(p => ({ value: p, label: p }));
  const statusOptions = [
    { value: "todo",        label: t.todo        },
    { value: "in-progress", label: t.inProgress  },
    { value: "done",        label: t.done        },
    { value: "cancelled",   label: t.cancelled   },
  ];

  const filtered = useMemo(() => tasks.filter(task => {
    if (filterPersons.length   > 0 && !task.who.some(w => filterPersons.includes(w))) return false;
    if (filterCategories.length > 0 && !filterCategories.includes(task.category))     return false;
    if (filterStatuses.length  > 0 && !filterStatuses.includes(task.status))          return false;
    if (query && !task.task.toLowerCase().includes(query.toLowerCase()) &&
        !(task.note || "").toLowerCase().includes(query.toLowerCase()))                return false;
    return true;
  }), [tasks, filterPersons, filterCategories, filterStatuses, query]);

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
    <Tabs defaultValue="list">
      {/* Tabs + Filters row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <TabsList>
          <TabsTrigger value="list">{t.tabList}</TabsTrigger>
          <TabsTrigger value="gantt">{t.tabGantt}</TabsTrigger>
        </TabsList>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={t.search}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-8 w-56"
          />
        </div>

        <MultiSelect
          options={personOptions}
          selected={filterPersons}
          onChange={setFilterPersons}
          placeholder={lang === "pl" ? "Osoby" : "People"}
        />
        <MultiSelect
          options={statusOptions}
          selected={filterStatuses}
          onChange={setFilterStatuses}
          placeholder={t.status}
        />
      </div>

      {/* List view */}
      <TabsContent value="list">
        {Object.entries(grouped).map(([status, items]) => {
          if (items.length === 0) return null;
          return (
            <div className="mb-5" key={status}>
              <div className="flex items-center gap-2.5 mb-2 px-1">
                <StatusPill status={status} lang={lang} />
                <span className="font-mono text-[11px] text-muted-foreground">{items.length}</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="bg-card border border-border rounded-[10px] overflow-hidden">
                {items.map(task => (
                  <div
                    key={task.id}
                    className="grid gap-3.5 items-center px-3.5 py-2.5 border-b border-border last:border-b-0 hover:bg-secondary transition-colors"
                    style={{ gridTemplateColumns: "auto 1fr auto" }}
                  >
                    <input
                      type="checkbox"
                      checked={task.status === "done"}
                      onChange={() => toggleStatus(task.id)}
                      className="w-[18px] h-[18px] accent-foreground"
                    />
                    <div
                      className="text-[13px] font-medium tracking-tight"
                      style={task.status === "done" ? { textDecoration: "line-through", color: "var(--muted-foreground)" } : {}}
                    >
                      {task.task}
                      {task.note && (
                        <p className="text-[11.5px] text-muted-foreground mt-0.5 font-normal">{task.note}</p>
                      )}
                    </div>
                    <span className="font-mono text-[11.5px] text-muted-foreground">{task.date || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </TabsContent>

      {/* Gantt view */}
      <TabsContent value="gantt">
        <Harmonogram lang={lang} tasks={filtered} />
      </TabsContent>
    </Tabs>
  );
};

export default TasksPage;
