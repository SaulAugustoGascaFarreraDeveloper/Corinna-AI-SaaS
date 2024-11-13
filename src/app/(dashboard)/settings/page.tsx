import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billing-settings'
import React from 'react'

const SettingsPage = () => {
  return (
    <>
         <InfoBar />
         <div className="flex-1 w-full overflow-y-auto chat-window h-0  flex flex-col gap-10">
            <BillingSettings />
         </div>
    </>
   
  )
}

export default SettingsPage