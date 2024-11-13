import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema"
import { useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "../use-toast"

export const useSignInForm = () => {

    const {isLoaded,setActive,signIn} = useSignIn()

    const [loading,setLoading] = useState<boolean>(false)

    const router = useRouter()

    const {toast} = useToast()


    const methods = useForm<UserLoginProps>({
        resolver: zodResolver(UserLoginSchema),
        mode: "onChange"
    })


    const onHandleSubmit = methods.handleSubmit(async (values) => {

        if(!isLoaded) return

        try{

            setLoading(true)

            const authenticated = await signIn?.create({
                identifier: values.email,
                password: values.password
            })

            if(authenticated?.status === "complete")
            {
                await setActive({ session: authenticated.createdSessionId })



                router.push('/settings')

                
                toast({
                    title: 'Success',
                    description: `Welcome back !!`,
                    variant: "default"
                })

                setLoading(false)
            }

            

        }catch(error)
        {
            setLoading(false)

            console.log("Hanlde Submit Login Error --> ",error)

            toast({
                title: "Error",
                description: "Login Error, email or password incorrect",
                variant: 'destructive'
            })

           
        }

    })


    return {onHandleSubmit,methods,loading}


}