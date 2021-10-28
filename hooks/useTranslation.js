import translations from '../intl/translations'

import { useRouter } from 'next/router'

export default function useTranslation () {
  const { locale, defaultLocale } = useRouter()
  function translate (key) {
    return translations[locale][key] || translations[defaultLocale][key]
  }
  return { translate, locale }
}
