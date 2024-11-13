"use client"


import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"


type ChatInitialValuesProps = {
    realtime: boolean
    setRealTime: Dispatch<SetStateAction<boolean>>
    chatRoom: string | undefined
    setChatRoom: Dispatch<SetStateAction<string | undefined>>
    chats:{
        message: string
        id: string
        role: 'assistant' | 'user' | null
        createdAt: Date
        seen: boolean
    }[]
    setChats: Dispatch<SetStateAction<{
        message: string
        id: string
        role: 'assistant' | 'user' | null
        createdAt: Date
        seen: boolean
    }[]>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
}

const ChatInitialValues: ChatInitialValuesProps = {
    chatRoom: undefined,
    setChatRoom: () => undefined,
    chats:[],
    setChats: () => undefined,
    loading: false,
    setLoading: () => undefined,
    realtime: false,
    setRealTime: () => undefined
}

const chatContext = createContext(ChatInitialValues)

const {Provider} = chatContext

export const ChatProvider = ({children} : {children: ReactNode}) => {

    const [chats,setChats] = useState(ChatInitialValues.chats)
    const [loading,setLoading] = useState(ChatInitialValues.loading)
    const [chatRoom,setChatRoom] = useState(ChatInitialValues.chatRoom)
    const [realtime,setRealTime] = useState(ChatInitialValues.realtime)

    const values = {
        chats,setChats,
        loading,setLoading,
        chatRoom,setChatRoom,
        realtime,setRealTime
    }

    return <Provider value={values} >
        {children}
    </Provider>
}


export const useChatContext = () => {

    const state = useContext(chatContext)

    return state

}