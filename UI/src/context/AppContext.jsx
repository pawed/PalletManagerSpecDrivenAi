import React, { createContext, useContext, useState, useEffect } from 'react';
import { FESTIVAL_DATA } from '../data/festival';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState("pl");
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState(FESTIVAL_DATA.TASKS);
  const [costs]   = useState(FESTIVAL_DATA.COSTS);
  const [revenue] = useState(FESTIVAL_DATA.REVENUE);
  const [items]   = useState(FESTIVAL_DATA.WAREHOUSE);

  const [filterPersons,     setFilterPersons]     = useState([]);
  const [filterCategories,  setFilterCategories]  = useState([]);
  const [tasksQuery,        setTasksQuery]        = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.setAttribute("lang", lang);
  }, [dark, lang]);

  return (
    <AppContext.Provider value={{
      lang, setLang,
      dark, setDark,
      tasks, setTasks,
      costs, revenue, items,
      filterPersons,    setFilterPersons,
      filterCategories, setFilterCategories,
      tasksQuery,       setTasksQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
