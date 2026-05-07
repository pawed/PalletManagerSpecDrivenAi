import React, { createContext, useContext, useState, useEffect } from 'react';
import { TASKS } from '../data/tasks';
import { COSTS } from '../data/costs';
import { REVENUE } from '../data/revenue';
import { WAREHOUSE } from '../data/warehouse';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState("pl");
  const [dark, setDark] =            useState(false);
  const [tasks, setTasks] = useState(TASKS);
  const [costs] = useState(COSTS);
  const [revenue] = useState(REVENUE);
  const [items] = useState(WAREHOUSE);

  const [filterPersons, setFilterPersons] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterStatuses, setFilterStatuses] = useState([]);
  const [tasksQuery, setTasksQuery] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("lang", lang);
  }, [dark, lang]);

  return (
    <AppContext.Provider value={{
      lang, setLang,
      dark, setDark,
      tasks, setTasks,
      costs, revenue, items,
      filterPersons, setFilterPersons,
      filterCategories, setFilterCategories,
      filterStatuses, setFilterStatuses,
      tasksQuery, setTasksQuery,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
