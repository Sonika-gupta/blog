import { createContext, useEffect, useState } from 'react'
import translations from './translations'

export const languages = Object.keys(translations)
export const defaultLang = languages[0]

export const LanguageContext = createContext({})

export function LanguageProvider ({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    setLang(localStorage.getItem('language') || 'en')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}
