import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from '../hooks/useTranslation'
import { useState } from 'react'
import LoginDialog from './LoginDialog'

export default function Header () {
  const { translate, locale } = useTranslation()
  const router = useRouter()

  const [openLogin, setOpenLogin] = useState(false)

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
      <div>
        <h1 className='text-5xl my-2 font-bold text-center'>
          {translate('blogName')}
        </h1>
      </div>
      <div className='float-right'>
        <button
          onClick={() => setOpenLogin(true)}
          className='uppercase text-blue-500 cursor-pointer p-4'
        >
          Log in
        </button>
        <button
          onClick={toggleLang}
          className='uppercase text-blue-500 cursor-pointer p-4'
        >
          {router.locale}
        </button>
      </div>
      <LoginDialog open={openLogin} />
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
