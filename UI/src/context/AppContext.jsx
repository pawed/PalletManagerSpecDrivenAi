import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState("pl");
  const [dark, setDark] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("lang", lang);
  }, [dark, lang]);

  return (
    <AppContext.Provider value={{ lang, setLang, dark, setDark, showAddTask, setShowAddTask }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
