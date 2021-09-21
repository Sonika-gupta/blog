import { useContext } from 'react'
import { defaultLang, LanguageContext } from '../intl/LanguageProvider'
import translations from '../intl/translations'

export default function useTranslation () {
  const { lang } = useContext(LanguageContext)
  function translate (key) {
    return translations[lang][key] || translations[defaultLang][key]
  }
  return { translate, lang }
}
