import OTPInput from '@/components/otp'
import React, { Dispatch, SetStateAction } from 'react'

type OTPFormProps = {
    onOTP: string
    setOTP: Dispatch<SetStateAction<string>>
}

const OTPForm = ({onOTP,setOTP} : OTPFormProps) => {
  return (
    <>
        <h2 className='text-black md:text-4xl font-bold'>Enter OTP</h2>
        <p className='md:text-sm text-black'>Enter the one time password that was sent your emal.</p>
        <div className="w-full justify-center flex py-5">
                <OTPInput 
                    otp={onOTP}
                    setOtp={setOTP}
                />
        </div>
    </>
  )
}

export default OTPForm