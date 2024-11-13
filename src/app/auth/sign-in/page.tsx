import SignInFormProvider from '@/components/forms/sign-in/form-provider'
import LoginForm from '@/components/forms/sign-in/login-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const SignIn = () => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">

      <div className="flex flex-col h-full gap-3">
            <SignInFormProvider>
              <div className="flex flex-col gap-3">
                <LoginForm />
                  <div className="flex flex-col gap-3 items-center w-full">
                        <Button>
                            Submit
                        </Button>

                        <p>
                          Don{"'"}t have an account ?
                          <Link
                            href={'/auth/sign-up'}
                            className='font-bold ml-1 hover:border-b-2 border-black'
                          >
                            Create One
                          </Link>
                        </p>
                  </div>
              </div>
            </SignInFormProvider>
      </div>

    </div>
  )
}

export default SignIn