"use client"

import { onGetConversationMode, onToogleRealtime } from "@/actions/conversation"
import { useChatContext } from "@/context/use-chat-context"
import { usePathname,useRouter} from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "../use-toast"
import { useClerk } from "@clerk/nextjs"

export const useSideBar = () => {

    const [expand,setExpand] = useState<boolean | undefined>(undefined)
    const [realtime,setRealtime] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)

    const router = useRouter()

    const pathname = usePathname()

    const {chatRoom} = useChatContext()

    const {toast} = useToast()


    const onActivateRealtime = async (e: any) => {

        try{

            const realtime  = await onToogleRealtime(chatRoom!,e.target.ariaChecked == "true" ? false : true)

            if(realtime)
            {
                setRealtime(realtime.chatRoom?.live as boolean)

                toast({
                    title: 'Success',
                    description: realtime.message
                })
            }

        }catch(error)
        {
            console.log("On Activate Realtime Error --> ",error)
        }

    }

    const onGetCurrentMode = async () => {
        setLoading(true)

        const mode = await onGetConversationMode(chatRoom!)


        if(mode)
        {
            setRealtime(mode.mode?.live as boolean)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(chatRoom)
        {
            onGetCurrentMode()
        }
    },[chatRoom])


    const page = pathname.split('/').pop()

    const {signOut} = useClerk()

    const onSignOut = () => signOut(() => router.push('/'))

    const onExpand  =  () => setExpand((prev) => !prev) 

    return{
        expand,
        onExpand,
        page,
        onSignOut,
        realtime,
        onActivateRealtime,
        chatRoom,
        loading
    }
    
}