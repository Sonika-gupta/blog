import '../styles/globals.css'
import Link from 'next/link'

function MyApp ({ Component, pageProps }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
