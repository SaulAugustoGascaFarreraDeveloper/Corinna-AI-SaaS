import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/use-chat-context'
import React,{ReactNode} from 'react'

type OwnerLayoutProps = {
    children: ReactNode
}


const OwnerLayout = async ({children} : OwnerLayoutProps) => {

    const authenticated = await onLoginUser()

    if(!authenticated) return null

  return (
    <ChatProvider>
        <div className='flex w-full h-screen'>
            <SideBar domains={authenticated.domain?.domains} />

            <div className='w-full h-screen flex flex-col pl-20 md:pl-4' >
              {children}
            </div>
            
        </div>
    </ChatProvider>
  )
}

export default OwnerLayout