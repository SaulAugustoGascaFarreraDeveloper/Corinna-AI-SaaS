"use client"
import { USER_LOGIN_FORM } from '@/constants/forms'
import React from 'react'
import FormGenerator from '../form-generator'
import { useFormContext } from 'react-hook-form'

const LoginForm = () => {

    const {register,formState: {errors}} = useFormContext()

  return (
    <>
        <h2 className='text-black md:text-4xl font-bold' >Login</h2>
        {USER_LOGIN_FORM.map((field,index) => (
            <FormGenerator 
                {...field}
                errors={errors}
                key={field.id}
                register={register}
                name={field.name}
            />
        ))}
    </>
  )
}

export default LoginForm