"use client"
import { Button } from '@/components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import Link from 'next/link'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ButtonHandler = () => {

  const {currentStep,setCurrentStep} = useAuthContextHook()
  const {formState,getFieldState,getValues} = useFormContext()
  const {onGenerateOTP} = useSignUpForm()


  const {isDirty: isName} = getFieldState('fullname',formState)
  const {isDirty: isEmail} = getFieldState('email',formState)
  const {isDirty: isPassword} = getFieldState('password',formState)

  if(currentStep === 3){
    return(
      <div className="flex flex-col w-full gap-3 items-center">
        <Button className='w-full' type='submit'>
          Create an Account
        </Button>
        <p>
          Already have an Account?{' '}
          <Link href={'/auth/sign-in'} className='font-bold' >
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  if(currentStep === 2){
    return(
      <div className="flex flex-col w-full gap-3 items-center">
        <Button 
            className='w-full' 
            type='submit'
            {...(isName && isEmail && isPassword && {
              onClick: () => {
                onGenerateOTP(getValues('email'),getValues('password'),setCurrentStep)
              }
            })}
        >
          Continue
        </Button>
        <p>
          Already have an Account?{' '}
          <Link href={'/auth/sign-in'} className='font-bold' >
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full gap-3 items-center">
        <Button 
            className='w-full' 
            type='submit'
            onClick={() => setCurrentStep((prev: number) => prev + 1)}
        >
          Continue
        </Button>
        <p>
          Already have an Account?{' '}
          <Link href={'/auth/sign-in'} className='font-bold' >
            Sign In
          </Link>
        </p>
      </div>
  )
}

export default ButtonHandler