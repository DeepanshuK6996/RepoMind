import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { AppSidebar } from './_components/app-sidebar'

type Props = {
  children: React.ReactNode
}

const SidebarLayout = ({children}: Props) => {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <AppSidebar />
      <main className='w-full m-2'>
        {/* sidebaar trigger correct later */}
        {/* <SidebarTrigger /> */}
        <div className='flex items-center gap-2 border-sidebar-border border bg-sidebar shadow rounded-md p-2 px-4'>
          {/* <SearchBar /> */}
          <div className="ml-auto"></div>
          <UserButton />
        </div>

        <div className="mt-4 border border-sidebar-border bg-sidebar shadow-lg rounded-md overflow-y-auto h-[calc(100vh-6rem)] p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default SidebarLayout
