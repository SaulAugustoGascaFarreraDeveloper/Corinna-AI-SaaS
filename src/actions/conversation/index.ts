"use server"
import {prisma} from "../../lib/prisma"

export const onToogleRealtime = async (id: string,state: boolean) => {

    try{

        const chatRoom = await prisma.chatRoom.update({
            where:{
                id: id
            },
            data:{
                live: state
            },
            select:{
                id:true,
                live: true,
            }
        })

        if(chatRoom)
        {
            return {status:200,message: chatRoom.live ? "Realtime mode enabled" : "Realtime mode disabled",chatRoom}
        }


        return {status: 404,message: "ChatRoom not Found !!"}

    }catch(error)
    {
        console.log("On Toogle Realtime Error -->",error)

        return {status: 500,message: "Internal Server Error"}
    }

}


export const onGetConversationMode = async (id: string) => {

    try{

        const mode = await prisma.chatRoom.findUnique({
            where:{
                id: id
            },
            select:{
                live: true
            }
        })

        if(mode)
        {
            return {status: 200,mode}
        }

        return {status: 404,message: "ChatRoom not Found !!"}

    }catch(error)
    {
        console.log("On Get Conversaion Mode Error -->",error)

        return {status: 500,message: "Internal Server Error"}
    }

}