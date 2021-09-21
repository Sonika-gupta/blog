import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext } from 'react'
import useTranslation from '../hooks/useTranslation'
import { LanguageContext, languages } from '../intl/LanguageProvider'

export default function Header () {
  const { translate, lang } = useTranslation()
  const { setLang } = useContext(LanguageContext)
  const router = useRouter()

  function toggleLang () {
    const currentLang = lang
    const index = languages.findIndex(locale => locale === lang) + 1
    const newLang = languages[index % languages.length]
    router.push(
      router.pathname,
      router.asPath.replace(currentLang, `${newLang}`)
    )
    setLang(newLang)
    localStorage.setItem('language', newLang)
  }
  return (
    <header>
      <button
        onClick={toggleLang}
        className='uppercase float-right text-blue-500 cursor-pointer'
      >
        {lang}
      </button>
      <h1 className='text-5xl my-2 font-bold text-center'>
        {translate('blogName')}
      </h1>
      <nav className='my-4'>
        <ul className='flex flex-row space-x-4 justify-center p-2'>
          <li>
            <Link href='/'>{translate('home')}</Link>
          </li>
          <li>
            <Link href={`/${lang}/articles`}>{translate('articles')}</Link>
          </li>
          <li>
            <Link href='/about'>{translate('about')}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
