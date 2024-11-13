"use server"
import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import {prisma} from "../../lib/prisma"
import { onGetAllAccountDomains } from "../settings"

export const onCompleteUserRegistration = async (fullname: string,clerkId: string,type: string) => {

    try{

        const registered = await prisma.user.create({
            data:{
                fullname: fullname,
                clerkId:clerkId,
                type: type,
                subscription:{
                    create: {}
                }
            },
            select:{
                fullname: true,
                id: true,
                type: true
            }
        })


        if(registered)
        {
            return {status:200,message:"User Created Succesfully",user: registered}
        }

        return {status:400,message:"User Cannot be Created !!"}

    }catch(error)
    {
        console.log("On Complete User Registration Error --> ",error)

        return {status:500,message:"Internal Server Error"}
    }

}


export const onLoginUser = async () => {

    const user = await currentUser()

        if(!user) redirectToSignIn()

    try{

        const authenticated = await prisma.user.findUnique({
            where:{
                clerkId: user?.id
            },
            select:{
                id: true,
                fullname: true,
                type: true
            }
        })

        if(authenticated)
        {
            const domains = await onGetAllAccountDomains()


            return {status: 200,user: authenticated,domain: domains?.domains}
        }

    }catch(error)
    {
        console.log("On Login User Error --> ",error)

        return {status: 500,messsage: "Internal Server Error"}
    }

}