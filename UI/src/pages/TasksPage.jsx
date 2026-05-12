import React, { useState, useMemo } from 'react';
import { Search, Loader2, RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { I18N } from '../data/i18n';
import { PEOPLE, TASK_CATEGORIES } from '../data/tasks';
import { StatusPill } from '../components/Layout';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { MultiSelect } from '../components/ui/multi-select';
import Harmonogram from '../components/Harmonogram';
import { useAppContext } from '../context/AppContext';
import { useTasks, useUpdateTaskStatus } from '../hooks/useTasks.js';
import { usePeople } from '../hooks/useUsers.js';
import { queryKeys } from '../lib/queryKeys.js';

const TasksPage = () => {
  const { lang } = useAppContext();
  const t = I18N[lang];
  const queryClient = useQueryClient();

  const [filterPersons,    setFilterPersons]    = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterStatuses,   setFilterStatuses]   = useState([]);
  const [query,            setQuery]            = useState("");

  const { data: tasks = [], isLoading: loadingTasks, isFetching } = useTasks();
  const { data: people = PEOPLE } = usePeople();
  const mutation = useUpdateTaskStatus();

  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });

  const personOptions = people.map(p => ({ value: p, label: p }));
  const statusOptions = [
    { value: "NotStarted", label: t.notStarted },
    { value: "InProgress", label: t.inProgress },
    { value: "Done",       label: t.done       },
    { value: "Blocked",    label: t.blocked    },
    { value: "Deleted",    label: t.deleted    },
  ];

  const filtered = useMemo(() => tasks.filter(task => {
    if (filterPersons.length    > 0 && !task.who.some(w => filterPersons.includes(w))) return false;
    if (filterCategories.length > 0 && !filterCategories.includes(task.category))      return false;
    if (filterStatuses.length   > 0 && !filterStatuses.includes(task.status))          return false;
    if (query && !task.task.toLowerCase().includes(query.toLowerCase()) &&
        !(task.note || "").toLowerCase().includes(query.toLowerCase()))                 return false;
    return true;
  }), [tasks, filterPersons, filterCategories, filterStatuses, query]);

  const grouped = useMemo(() => {
    const order = ["InProgress", "NotStarted", "Done", "Blocked", "Deleted"];
    const g = {};
    order.forEach(s => (g[s] = []));
    filtered.forEach(task => g[task.status].push(task));
    Object.values(g).forEach(arr =>
      arr.sort((a, b) => {
        if (!a.completeDate) return 1;
        if (!b.completeDate) return -1;
        return a.completeDate.localeCompare(b.completeDate);
      })
    );
    return g;
  }, [filtered]);

  const toggleStatus = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    mutation.mutate({ id, status: task.status === "Done" ? "NotStarted" : "Done" });
  };

  if (loadingTasks) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isFetching && !loadingTasks && (
        <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}
    <Tabs defaultValue="list">
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

        <button
          onClick={refresh}
          disabled={isFetching}
          className="ml-auto inline-flex items-center gap-1.5 px-3 h-8 rounded-md border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3 w-3 ${isFetching ? "animate-spin" : ""}`} />
          {lang === "pl" ? "Odśwież" : "Refresh"}
        </button>
      </div>

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
                      checked={task.status === "Done"}
                      onChange={() => toggleStatus(task.id)}
                      className="w-[18px] h-[18px] accent-foreground"
                    />
                    <div
                      className="text-[13px] font-medium tracking-tight"
                      style={task.status === "Done" ? { textDecoration: "line-through", color: "var(--muted-foreground)" } : {}}
                    >
                      {task.task}
                      {task.note && (
                        <p className="text-[11.5px] text-muted-foreground mt-0.5 font-normal">{task.note}</p>
                      )}
                    </div>
                    <span className="font-mono text-[11.5px] text-muted-foreground">{task.completeDate || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </TabsContent>

      <TabsContent value="gantt">
        <Harmonogram lang={lang} tasks={filtered} />
      </TabsContent>
    </Tabs>
    </div>
  );
};

export default TasksPage;
