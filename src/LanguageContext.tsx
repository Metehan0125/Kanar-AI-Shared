import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isTR: boolean;
  isEN: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'TR',
  setLang: () => {},
  t: (key) => translations.TR[key] || key,
  isTR: true,
  isEN: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('tefas_lang') as Language) || 'TR';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('tefas_lang', newLang);
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[lang] || translations.TR;
    return dict[key] || translations.TR[key] || key;
  };

  const isTR = lang === 'TR';
  const isEN = lang === 'EN';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isTR, isEN }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
