import { useState } from 'react'
import { addUser } from '../lib/data'

export default function LoginDialog ({ open }) {
  const [signIn, setSignIn] = useState(true)

  function handleLogin (e, form) {
    e.preventDefault()
    console.log(form)
  }

  async function handleSignup (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const user = {
      email: data.get('email'),
      fname: data.get('fname'),
      lanme: data.get('lname'),
      password: data.get('password')
    }
    console.log(await addUser(user))
  }
  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex'>
      <div className='relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg'>
        {signIn ? (
          <>
            <div className='text-center mb-3'>
              <h6 className='text-gray-600 text-sm font-bold'> Log In </h6>
            </div>
            <div>
              <form name='signIn'>
                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-gray-700 text-xs font-bold mb-2'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    type='email'
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
                      style={{ transition: 'all .15s ease' }}
                    />
                    <span className='ml-2 text-sm font-semibold text-gray-700'>
                      Remember me
                    </span>
                  </label>
                </div>

                <div className='text-center mt-6'>
                  <button
                    className='bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded hover:shadow-lg outline-none focus:outline-none w-full'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className='text-center m-3'>
                <span className='text-gray-600 text-sm pr-2'>
                  Don't have an account?
                </span>
                <button
                  className='text-blue-600 text-sm'
                  onClick={() => setSignIn(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='text-center mb-3'>
              <h6 className='text-gray-600 text-sm font-bold'>
                Create New Account
              </h6>
            </div>
            <div>
              <form name='signUp' onSubmit={handleSignup}>
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
                    style={{ transition: 'all .15s ease' }}
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className='text-center m-3'>
                <span className='text-gray-600 text-sm pr-2'>
                  Already have an account?
                </span>
                <button
                  className='text-blue-600 text-sm'
                  onClick={() => setSignIn(true)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
