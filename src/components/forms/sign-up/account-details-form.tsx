import { USER_REGISTRATION_FORM } from '@/constants/forms'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type AccountDetailsFormProps = {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

const AccountDetailsForm = ({register,errors} : AccountDetailsFormProps) => {
  return (
    <>
        <h2 className='md:text-4xl font-bold text-black'>Account Details</h2>
        <p className='md:text-sm text-black'>Enter your email and password</p>
        {USER_REGISTRATION_FORM.map((field) => (
            <FormGenerator  
                key={field.id}
                register={register}
                errors={errors}
                {...field}
                name={field.name}
            />
        ))}
    </>
  )
}

export default AccountDetailsForm