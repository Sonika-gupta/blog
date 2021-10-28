import { useState } from 'react'
import { addUser, authenticateEmail } from '../lib/data'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default function LoginDialog ({ open, closeDialog }) {
  const [signIn, setSignIn] = useState(true)

  function closeForm () {
    setSignIn(true)
    closeDialog()
  }

  return (
    open && (
      <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex'>
        <div className='relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg'>
          {signIn ? (
            <>
              <SignInForm closeDialog={closeForm} />
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
            </>
          ) : (
            <>
              <SignUpForm closeDialog={closeForm} />
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
            </>
          )}
        </div>
      </div>
    )
  )
}
