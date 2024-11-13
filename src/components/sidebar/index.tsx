"use client"

import { useSideBar } from '@/hooks/sidebar/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import MaxMenu from './maximized-menu'
import MinMenu from './minimized-menu'

type SideBarProps = {
   
    domains:
    | {
        id: string
        name: string
        icon: string
      }[]
    | null
    | undefined
    
}


const SideBar = ({domains} : SideBarProps) => {

    const {expand,onExpand,page,onSignOut} = useSideBar()

  return (
    <div className={cn("bg-slate-200 h-full w-[60px] fill-mode-forwards fixed md:relative",
      expand === undefined && '',
      expand === true ? "animate-open-sidebar" : expand == false && "animate-close-sidebar"
    )}>
      {expand ? 
      (
      <MaxMenu 
        onExpand={onExpand}
        domains={domains}
        onSignOut={onSignOut}
        current={page!}
      />) 
      
      : 
      ( <MinMenu 
        onShrink={onExpand}
        domains={domains}
        onSignOut={onSignOut}
        current={page!}
      />)}
    </div>
  )
}

export default SideBar