import React, { useState, useEffect } from 'react';
import { FESTIVAL_DATA, I18N } from './data/festival';
import { Sidebar, Topbar } from './components/Layout';
import Overview from './sections/Overview';
import Tasks from './sections/Tasks';
import Costs from './sections/Costs';
import Warehouse from './sections/Warehouse';
import './styles/globals.css';

function App() {
  const [active, setActive] = useState("overview");
  const [lang, setLang] = useState("pl");
  const [dark, setDark] = useState(false);

  const [tasks, setTasks] = useState(FESTIVAL_DATA.TASKS);
  const [costs] = useState(FESTIVAL_DATA.COSTS);
  const [revenue] = useState(FESTIVAL_DATA.REVENUE);
  const [items] = useState(FESTIVAL_DATA.WAREHOUSE);

  const [filterPersons, setFilterPersons] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [tasksQuery, setTasksQuery] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.setAttribute("lang", lang);
  }, [dark, lang]);

  const t = I18N[lang];

  const titles = {
    overview: { title: t.overview, sub: t.overviewSub },
    tasks: { 
      title: t.tasksTitle, 
      sub: `${tasks.length} ${lang === "pl" ? "zadań" : "tasks"}` 
    },
    costs: { 
      title: t.costsTitle, 
      sub: `${costs.length + revenue.length} ${lang === "pl" ? "pozycji" : "entries"}` 
    },
    warehouse: { 
      title: t.warehouseTitle, 
      sub: `${items.length} ${lang === "pl" ? "pozycji" : "items"}` 
    },
  };

  const counts = {
    tasks: tasks.filter(x => x.status !== "done" && x.status !== "cancelled").length,
    costs: costs.length,
    warehouse: items.length,
  };

  return (
    <div className="app">
      <Sidebar active={active} onNav={setActive} lang={lang} counts={counts} />
      <div className="main">
        <Topbar
          title={titles[active].title}
          sub={titles[active].sub}
          lang={lang}
          setLang={setLang}
          dark={dark}
          setDark={setDark}
          onPrint={() => window.print()}
          onAdd={active !== "overview" ? () => alert(lang === "pl" ? "Dodawanie nowej pozycji (mockup)" : "Add new entry (mockup)") : null}
        />
        <div className="content">
          {active === "overview" && (
            <Overview lang={lang} tasks={tasks} costs={costs} revenue={revenue} items={items} onNav={setActive} />
          )}
          {active === "tasks" && (
            <Tasks
              lang={lang}
              tasks={tasks}
              setTasks={setTasks}
              filterPersons={filterPersons}
              setFilterPersons={setFilterPersons}
              filterCategories={filterCategories}
              setFilterCategories={setFilterCategories}
              query={tasksQuery}
              setQuery={setTasksQuery}
            />
          )}
          {active === "costs" && (
            <Costs lang={lang} costs={costs} revenue={revenue} />
          )}
          {active === "warehouse" && (
            <Warehouse lang={lang} items={items} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
