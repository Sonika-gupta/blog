import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from '../hooks/useTranslation'

export default function Header () {
  const { translate, locale } = useTranslation()
  const router = useRouter()

  function toggleLang () {
    const currentLocale = locale
    const index = router.locales.findIndex(item => item === locale) + 1
    const newLocale = router.locales[index % router.locales.length]
    console.log('changing language', router)
    router.replace(router.pathname, router.asPath, { locale: newLocale })
    localStorage.setItem('language', newLocale)
  }
  return (
    <header>
      <button
        onClick={toggleLang}
        className='uppercase float-right text-blue-500 cursor-pointer'
      >
        {router.locale}
      </button>
      <h1 className='text-5xl my-2 font-bold text-center'>
        {translate('blogName')}
      </h1>
      <nav className='my-4'>
        <ul className='flex flex-row space-x-4 justify-center p-2'>
          <li>
            <Link href='/' locale={router.locale}>
              {translate('home')}
            </Link>
          </li>
          <li>
            <Link href='/articles' locale={router.locale}>
              {translate('articles')}
            </Link>
          </li>
          <li>
            <Link href='/about' locale={router.locale}>
              {translate('about')}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
