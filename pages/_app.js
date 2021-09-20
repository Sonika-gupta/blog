import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import Link from 'next/link'

function MyApp ({ Component, pageProps }) {
  return (
    <div className='mx-auto w-9/12 p-4'>
      <header>
        <h1 className='text-5xl my-2 font-bold text-center'>My Blog</h1>
        <nav className='my-4'>
          <ul className='flex flex-row space-x-4 justify-center p-2'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
