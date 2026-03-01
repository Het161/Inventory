'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, Language, TranslationKeys } from '../lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'English',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('English')

  useEffect(() => {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        if (prefs.language && translations[prefs.language as Language]) {
          setLanguageState(prefs.language as Language)
        }
      } catch (e) {}
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Save to localStorage
    try {
      const saved = localStorage.getItem('userPreferences')
      const prefs = saved ? JSON.parse(saved) : {}
      prefs.language = lang
      localStorage.setItem('userPreferences', JSON.stringify(prefs))
    } catch (e) {}
  }

  const t = (key: TranslationKeys): string => {
    return translations[language]?.[key] ?? translations.English[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
