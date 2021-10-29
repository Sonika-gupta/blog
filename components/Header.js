import { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from '../hooks/useTranslation'
import { useContext, useState } from 'react'
import LoginDialog from './LoginDialog'
import UserContext from '../userContext'

export default function Header () {
  const { translate, locale } = useTranslation()
  const router = useRouter()

  const [openLogin, setOpenLogin] = useState(false)
  const { user } = useContext(UserContext)

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
      <div
        className='flex justify-between mb-4'
        onKeyDown={e => e.key === 'Escape' && setOpenLogin(false)}
      >
        <Link href='/' locale={router.locale}>
          <div className='flex cursor-pointer'>
            <img src='favicon.ico' className='w-12 h-12 mx-4 my-2' />
            <h1 className='font-serif italic text-5xl text-leaf-green text-opacity-80 my-2'>
              {translate('blogName')}
            </h1>
          </div>
        </Link>
        <nav className='my-4'>
          <ul className='flex flex-row space-x-4 justify-center p-2'>
            <li>
              <Link href='/write' locale={router.locale}>
                {translate('write')}
              </Link>
            </li>
            <li>
              <Link href='/about' locale={router.locale}>
                {translate('about')}
              </Link>
            </li>
            <li>
              {user._id ? (
                <Link href='/profile' locale={router.locale}>
                  <span className='text-blue-500 hover:text-blue-300 font-semibold'>
                    {user.fname} {user.lname}
                  </span>
                </Link>
              ) : (
                <button
                  onClick={() => setOpenLogin(true)}
                  className='text-blue-500 cursor-pointer font-semibold'
                >
                  Log in
                </button>
              )}
            </li>
            <li>
              <button
                onClick={toggleLang}
                className='uppercase text-blue-500 cursor-pointer font-semibold'
              >
                {router.locale}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <LoginDialog open={openLogin} closeDialog={() => setOpenLogin(false)} />
    </header>
  )
}
