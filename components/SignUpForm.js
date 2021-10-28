import { useContext, useState } from 'react'
import { addUser, authenticateEmail } from '../lib/data'
import UserContext from '../userContext'
// import Loader from './Loader'

export default function SignUpForm ({ closeDialog }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })
  const [showNext, setShowNext] = useState(false)
  const [email, setEmail] = useState('')
  const { user, setUser } = useContext(UserContext)

  function getFormData (form) {
    const data = new FormData(form)
    return {
      email,
      fname: data.get('fname'),
      lname: data.get('lname'),
      password: data.get('password')
    }
  }
  async function verifyEmail () {
    console.log(email)
    setLoading(true)
    const userExists = await authenticateEmail(email)
    userExists
      ? setError({ show: true, msg: 'User Already Exists' })
      : setShowNext(true)
  }

  async function handleSignup (e) {
    e.preventDefault()
    const addedUser = await addUser(getFormData(e.target))
    console.log(addedUser)
    if (addedUser._id) setUser(addedUser)
    closeDialog()
  }

  return (
    <>
      <div className='text-center mb-5'>
        <h6 className='text-gray-600 text-sm font-bold'>Create New Account</h6>
      </div>
      {!showNext ? (
        <div>
          <div className='relative w-full mb-3'>
            <label
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              defaultValue={email}
              className='border-0 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {error.show && (
            <span className='text-sm text-red-500 ml-1'>{error.msg}</span>
          )}
          <div className='text-center mt-6'>
            <button
              className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none w-full'
              style={{ transition: 'all .15s ease' }}
              onClick={verifyEmail}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <form name='signUp' onSubmit={handleSignup}>
          <div className='relative w-full mb-3 flex'>
            <div className='w-1/2 mr-1'>
              <label
                className='block uppercase text-gray-700 text-xs font-bold mb-2'
                htmlFor='fname'
              >
                First Name
              </label>
              <input
                name='fname'
                className='border-0 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                placeholder='John'
              />
            </div>
            <div className='w-1/2 ml-1'>
              <label
                className='block uppercase text-gray-700 text-xs font-bold mb-2'
                htmlFor='lname'
              >
                Last Name
              </label>
              <input
                name='lname'
                className='border-0 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                placeholder='Doe'
              />
            </div>
          </div>

          <div className='relative w-full mb-3'>
            <label
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              className='border-0 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
              placeholder='Password'
            />
          </div>

          <div className='text-center mt-6'>
            <button
              className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none w-full'
              type='submit'
            >
              Sign up
            </button>
          </div>
        </form>
      )}
      {/* <Loader /> */}
    </>
  )
}
