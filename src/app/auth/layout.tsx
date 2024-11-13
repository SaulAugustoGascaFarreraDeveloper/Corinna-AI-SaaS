import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

type LayoutProps = {
    children: ReactNode
}


const Layout = async ({children} : LayoutProps) => {

    const user = await currentUser()

    if(user) redirect('/')

  return (
    <div className='flex h-screen justify-center w-full'>
        <div className="flex flex-col ld:w-full w-[600px] items-start p-6">

            <Image 
                src={'/images/logo.png'}
                alt='logo'
                sizes='100vw'
                width={0}
                height={0}
                style={{
                    width: '20%',
                    height: 'auto'
                }}
            />

            {children}

        </div>

        <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative bg-[#ffffff] flex-col pt-10 pl-24 gap-3">
                <h2 className='font-bold text-pretty md:text-4xl'>
                    Hi, I'm your AI powered sales assistant, Corinna !!
                </h2>
                <p className="text-iridium md:text-sm mb-10">
                    Corinna is capable of capturing lead information without a form...{' '}
                    <br />
                    something never done before 😉
                </p>
                <Image
                src="/images/app-ui.png"
                alt="app image"
                loading="lazy"
                sizes="30"
                className="absolute shrink-0 !w-[1600px] top-48 pr-36"
                width={0}
                height={0}
                />
        </div>

    </div>
  )
}

export default Layout