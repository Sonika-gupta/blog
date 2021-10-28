import 'react-quill/dist/quill.snow.css'
import '../styles/globals.css'
import Header from '../components/Header'
import UserContext from '../userContext'
import { useState } from 'react'

function MyApp ({ Component, pageProps }) {
  const [user, setUser] = useState({ email: '', lname: '', fname: '' })
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='mx-auto w-9/12 p-4'>
        <Header />
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  )
}

export default MyApp
