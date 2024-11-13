import React, { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type TypeSelectionFormProps = {
    register: UseFormRegister<FieldValues>
    userType: "owner" | "student"
    setUserType: Dispatch<SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({register,userType,setUserType} : TypeSelectionFormProps) => {
  return (
    <>
        <h2 className='text-black font-bold md:text-4xl' >Create an account</h2>
        <p className='md:text-sm'>Tell us about yourself! What do you do? Let{"'"}s tell your
            <br /> experience so it best suits you.
        </p>
        <UserTypeCard 
            register={register}
            userType={userType}
            setUserType={setUserType}
            value='owner'
            title='I own a bussiness'
            text='Setting up my account for my company.'
        />
        <UserTypeCard 
            register={register}
            userType={userType}
            setUserType={setUserType}
            value='student'
            title="Im a student"
            text="Looking to learn about the tool."
        />
    </>
  )
}

export default TypeSelectionForm