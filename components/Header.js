import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import useTranslation from '../hooks/useTranslation'
import { useContext, useState } from 'react'
import LoginDialog from './LoginDialog'
import UserContext from '../userContext'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header () {
  const { translate, locale } = useTranslation()
  const router = useRouter()

  const [openLogin, setOpenLogin] = useState(false)
  // const { user } = useContext(UserContext)

  const { data: session, status } = useSession()
  console.log('session', session)

  // console.log('refreshed user', user)
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
            <img src='/favicon.ico' className='mx-4 my-2 w-12 h-12' />
            <h1 className='font-serif italic text-5xl text-leaf-green text-opacity-80 my-2'>
              {translate('blogName')}
            </h1>
          </div>
        </Link>
        <nav className='my-4'>
          <ul className='flex space-x-4 justify-center items-center p-2 gap-2'>
            <li>
              <button
                onClick={toggleLang}
                className='uppercase text-blue-500 cursor-pointer font-semibold'
              >
                {router.locale}
              </button>
            </li>
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
            {/* <Link href='/profile' locale={router.locale}>
              <span className='text-lg hover:text-blue-300 align-middle'>
                {session.user.name}
              </span>
            </Link> */}
            {status === 'loading' ? (
              <p>Loading...</p>
            ) : (
              <li>
                {session ? (
                  <div className='flex'>
                    <button
                      onClick={() => signOut()}
                      className='text-blue-500 cursor-pointer font-semibold'
                    >
                      {session.user.name}
                    </button>
                    <img
                      src={session.user.image}
                      className='mx-4 my-2 w-8 h-8'
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className='text-blue-500 cursor-pointer font-semibold'
                  >
                    Log in
                  </button>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
      <LoginDialog open={openLogin} closeDialog={() => setOpenLogin(false)} />
    </header>
  )
}
