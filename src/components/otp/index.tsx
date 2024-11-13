import React, { Dispatch, SetStateAction } from 'react'
import { InputOTP, InputOTPSlot } from '../ui/input-otp'


type OTPInputProps = {
    otp: string
    setOtp: Dispatch<SetStateAction<string>>
}

const OTPInput = ({otp,setOtp} : OTPInputProps) => {
  return (
    <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
        <div className="flex gap-3">
            {Array.from({length: 6}).map((_,index) => (
                <div key={index} >
                    <InputOTPSlot index={index} />
                </div>
            ))}
        </div>
    </InputOTP>
  )
}

export default OTPInput