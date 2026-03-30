import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Translation } from '../translations'

interface LanguageContextType {
  lang: string
  setLang: (lang: string) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('portfolio-lang')
    if (saved) return saved

    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('de')) return 'de'
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang)
  }, [lang])

  const t = translations[lang as keyof typeof translations] || translations.en

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
