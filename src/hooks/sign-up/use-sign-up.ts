import { Button } from "@/components/ui/button"
import { useToast } from "../use-toast"
import { Dispatch, SetStateAction, useState } from "react"
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import {useForm} from "react-hook-form"
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema"
import {zodResolver} from "@hookform/resolvers/zod"
import { sign } from "crypto"
import { onCompleteUserRegistration } from "@/actions/auth"


export const useSignUpForm = () => {

    const {toast} = useToast()
    const [loading,setLoading] = useState<boolean>(false)
    const {isLoaded,signUp,setActive} = useSignUp()

    const router = useRouter()

    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues:{
            type: 'owner'
        },
        mode: 'onChange'
    })

    const onGenerateOTP = async (email: string,password: string,onNext: Dispatch<SetStateAction<number>>) => {
        if(!isLoaded) return

        try{

            await signUp.create({
                emailAddress: email,
                password: password
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            //console.log("SE DBE CREATR EL OTPPPPPPP")

            onNext((prev) => prev + 1)
   

        }catch(error: any)
        {
            console.log("On Generate OTP Error --> ",error)

            toast({
                title: 'Error',
                description: "Generate OTP Code Failed !!",
                variant: "destructive"
            })
        }
    }


    const onHandleSubmit = methods.handleSubmit(async (values) => {
        if(!isLoaded) return

        try{

            setLoading(true)

            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: values.otp
            })

            if(completeSignUp.status !== "complete")
            {
                return {message: "Something went wrong with OTP Verification!!"}
            }

            if(completeSignUp.status === "complete")
            {
                if(!signUp.createdUserId) return


                const registered = await onCompleteUserRegistration(
                    values.fullname,
                    signUp.createdUserId,
                    values.type
                )


                if(registered?.status === 200 && registered.user)
                {
                    await setActive({
                        session: completeSignUp.createdSessionId
                    })

                    setLoading(false)

                    router.push('/dashboard')
                }

                if(registered?.status === 400)
                {
                    toast({
                        title: 'Error',
                        description: registered.message,
                        variant: "destructive"
                    })
                }
            }

        }catch(error)
        {
            console.log("Handle Submit Sign Up form Error --> ",error)
        }
    })
    
    return {onHandleSubmit,loading,onGenerateOTP,methods}
}