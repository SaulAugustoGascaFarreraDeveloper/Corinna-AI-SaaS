"use client"
import { Loader } from '@/components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignInForm } from '@/hooks/sign-in/use-sign-in'
import React, { ReactNode } from 'react'
import { FormProvider } from 'react-hook-form'

type SignInFormProviderProps = {
    children: ReactNode
}


const SignInFormProvider = ({children} : SignInFormProviderProps) => {

  const {loading,methods,onHandleSubmit} = useSignInForm()

  return (
    <AuthContextProvider>
          <FormProvider {...methods} >
           
           <form onSubmit={onHandleSubmit} className='h-full' >
              <div className='flex flex-col gap-3 justify-between h-full'>
                  <Loader loading={loading} >
                    {children}
                  </Loader>
              </div>
           </form>
           
          </FormProvider>
              
          
    </AuthContextProvider>
   
  )
}

export default SignInFormProvider