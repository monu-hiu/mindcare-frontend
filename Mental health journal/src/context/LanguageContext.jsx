// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext();

const STORAGE_KEY = "mc_language";
const SUPPORTED = ["en", "hi", "hin"];

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (!SUPPORTED.includes(lang)) return;
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setShowSelector(false);
  };

  const checkShowSelector = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShowSelector(true);
    }
  };

  // ✅ FIXED t() function
  const t = (key) => {
    try {
      const [section, ...rest] = key.split(".");

      // Get the language-specific object for this section
      let result = translations?.[section]?.[language];
      if (!result) return key;

      // Traverse remaining keys (e.g. "categories.trackers")
      for (const part of rest) {
        result = result[part];
        if (result === undefined) return key;
      }

      return typeof result === "string" ? result : key;
    } catch {
      return key;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        showSelector,
        setShowSelector,
        checkShowSelector,
        t,
        translations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export default LanguageContext;
