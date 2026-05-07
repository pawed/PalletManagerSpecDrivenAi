import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { I18N } from './data/i18n';
import { Sidebar, Topbar } from './components/Layout';
import OverviewPage  from './pages/OverviewPage';
import TasksPage     from './pages/TasksPage';
import CostsPage     from './pages/CostsPage';
import WarehousePage from './pages/WarehousePage';
import { useAppContext } from './context/AppContext';
import './styles/index.css';

function App() {
  const { lang, setLang, dark, setDark, tasks, costs, revenue, items } = useAppContext();
  const location = useLocation();
  const t = I18N[lang];

  const pageMeta = {
    "/overview":  { title: t.overview,      sub: t.overviewSub },
    "/tasks":     { title: t.tasksTitle,     sub: `${tasks.length} ${lang === "pl" ? "zadań" : "tasks"}` },
    "/costs":     { title: t.costsTitle,     sub: `${costs.length + revenue.length} ${lang === "pl" ? "pozycji" : "entries"}` },
    "/warehouse": { title: t.warehouseTitle, sub: `${items.length} ${lang === "pl" ? "pozycji" : "items"}` },
  };

  const meta     = pageMeta[location.pathname] ?? pageMeta["/overview"];
  const isOverview = location.pathname === "/overview" || location.pathname === "/";

  const counts = {
    tasks:     tasks.filter(x => x.status !== "done" && x.status !== "cancelled").length,
    costs:     costs.length,
    warehouse: items.length,
  };

  return (
    <div className="grid grid-cols-[232px_1fr] min-h-screen bg-background text-foreground">
      <Sidebar lang={lang} counts={counts} />
      <div className="min-w-0 flex flex-col">
        <Topbar
          title={meta.title}
          sub={meta.sub}
          lang={lang}
          setLang={setLang}
          dark={dark}
          setDark={setDark}
          onPrint={() => window.print()}
          onAdd={!isOverview
            ? () => alert(lang === "pl" ? "Dodawanie nowej pozycji (mockup)" : "Add new entry (mockup)")
            : null}
        />
        <div className="p-7 pb-16 flex-1 min-w-0 overflow-y-auto">
          <Routes>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="/overview"  element={<OverviewPage />} />
            <Route path="/tasks"     element={<TasksPage />} />
            <Route path="/costs"     element={<CostsPage />} />
            <Route path="/warehouse" element={<WarehousePage />} />
            <Route path="*"          element={<Navigate to="/overview" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
