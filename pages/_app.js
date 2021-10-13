import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import Header from '../components/header'

function MyApp ({ Component, pageProps }) {
  return (
    <div className='mx-auto w-9/12 p-4'>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
