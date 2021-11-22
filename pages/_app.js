import '../styles/globals.css'
import Header from '../components/Header'

import { SessionProvider } from 'next-auth/react'
function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className='mx-auto w-9/12 p-4'>
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
