"use server"

import { currentUser, redirectToSignIn } from "@clerk/nextjs"
import {prisma} from "@/lib/prisma"
import { onLoginUser } from "../auth"


export const onGetSubscriptionPlan = async () => {

    try{

        const user = await currentUser()

        if(!user) return


        const plan = await prisma.user.findUnique({
            where:{
                clerkId: user.id
            },
            select:{
                subscription:{
                    select:{
                        plan: true
                    }
                }
            }
        })

        if(plan)
        {
            return {status: 200,plan: plan.subscription?.plan }
        }

        return{status: 404,message:"Plan couldn't be find"}

    }catch(error)
    {
        console.log("On Get Subscription Plan Error --> ",error)
    }

}


export const onGetAllAccountDomains = async () => {

    const user = await currentUser()

    if(!user) redirectToSignIn()

    try{

        

        const domains = await prisma.user.findUnique({
            where:{
                clerkId: user?.id
            },
            select:{
                id: true,
                domains:{
                    select:{
                        name: true,
                        icon: true,
                        id: true,
                        customer:{
                            select:{
                                chatRoom:{
                                    select:{
                                        id: true,
                                        live: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
        })


        if(domains)
        {
            return {status: 200,domains: domains}
        }


        return {status:404,message: "Domain not Found !!"}

    }catch(error)
    {
        console.log("On Get All Account Domains Error -->",error)

        return {status:500,message: "Internal Server Error"}
    }

}


export const onIntegrateDomain = async(name: string,image: any) => {
    

    const user = await currentUser()

    if(!user) return

    try{

        const subscription = await prisma.user.findUnique({
            where:{
                clerkId: user.id
            },
            select:{
                _count:{
                    select:{
                        domains: true
                    }
                },
                subscription:{
                    select:{
                        plan: true
                    }
                }
            }
        })


        const domainExists = await prisma.user.findFirst({
            where:{
                clerkId: user.id,
                domains:{
                    some:{
                        name: name
                    }
                }
            }
        })

        if(!domainExists)
        {
            if((subscription?.subscription?.plan == "STANDARD" && 
                subscription._count.domains < 1) || 
                (subscription?.subscription?.plan == "PRO" && 
                    subscription._count.domains < 5) ||
                (subscription?.subscription?.plan == "ULTIMATE" &&
                    subscription._count.domains < 10)    
            ){

                const newDomain = await prisma.user.update({
                    where:{
                        clerkId: user.id
                    },
                    data:{
                        domains:{
                            create:{
                                name: name,
                                icon: image,
                                chatBot:{
                                    create:{
                                        welcomeMessage: "Hey there, have a question? Text us here."
                                    }
                                }
                            }
                        }
                    }
                })

                if(newDomain)
                {
                    return {status: 200,message: "Domain sucesfully added"}
                }
                
            }

            return {status: 400,message: "You have reached the maximum number of domains, Update you plan !!"}
        }


        return {status: 400,message: "Domain already exist !!"}
        

    }catch(error){
        console.log("On Integrate Domain Error --> ",error)

        return {status: 500,message: "Internal Server Error"}
    }

}
