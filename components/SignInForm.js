import { useContext, useState } from 'react'
import { authenticateUser } from '../lib/data'
import UserContext from '../userContext'

export default function SignInForm ({ closeDialog }) {
  const { user, setUser } = useContext(UserContext)
  const [error, setError] = useState({ show: false, msg: '' })

  async function handleSignIn (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const creds = {
      email: data.get('email'),
      password: data.get('password')
    }
    const response = await authenticateUser(creds)
    if (response.error) setError({ show: true, msg: response.error })
    else {
      setUser(response)
      closeDialog()
    }
  }

  return (
    <>
      <div className='text-center mb-3'>
        <h6 className='text-gray-600 text-sm font-bold'> Log In </h6>
      </div>
      <form name='signIn' onSubmit={handleSignIn}>
        {error.show && (
          <span className='text-sm text-red-500 ml-1'>{error.msg}</span>
        )}
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
            className='border-0 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
            placeholder='Email'
          />
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
        <div>
          <label className='inline-flex items-center cursor-pointer'>
            <input
              id='customCheckLogin'
              type='checkbox'
              className='form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5'
            />
            <span className='ml-2 text-sm font-semibold text-gray-700'>
              Remember me
            </span>
          </label>
        </div>

        <div className='text-center mt-6'>
          <button
            className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none w-full'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  )
}
