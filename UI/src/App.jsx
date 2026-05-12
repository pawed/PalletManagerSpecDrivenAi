import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import { I18N } from './data/i18n';
import { Sidebar, Topbar } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import OverviewPage  from './pages/OverviewPage';
import TasksPage     from './pages/TasksPage';
import CostsPage     from './pages/CostsPage';
import WarehousePage from './pages/WarehousePage';
import { useAppContext } from './context/AppContext';
import './styles/index.css';


function App() {
  const { lang, setLang, dark, setDark, setShowAddTask } = useAppContext();
  const location = useLocation();
  const t = I18N[lang];

  const pageMeta = {
    "/overview":  { title: t.overview,      sub: t.overviewSub },
    "/tasks":     { title: t.tasksTitle,     sub: null },
    "/costs":     { title: t.costsTitle,     sub: null },
    "/warehouse": { title: t.warehouseTitle, sub: null },
  };

  const meta       = pageMeta[location.pathname] ?? pageMeta["/overview"];
  const isOverview = location.pathname === "/overview" || location.pathname === "/";

  const counts = { tasks: null, costs: null, warehouse: null };

  return (
    <>
    <Toaster position="top-right" richColors />
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
          onAdd={location.pathname === "/tasks"
            ? () => setShowAddTask(true)
            : null}
        />
        <div className="p-7 pb-16 flex-1 min-w-0 overflow-y-auto">
          <ErrorBoundary>
            <Routes>
              <Route index element={<Navigate to="/overview" replace />} />
              <Route path="/overview"  element={<OverviewPage />} />
              <Route path="/tasks"     element={<TasksPage />} />
              <Route path="/costs"     element={<CostsPage />} />
              <Route path="/warehouse" element={<WarehousePage />} />
              <Route path="*"          element={<Navigate to="/overview" replace />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
