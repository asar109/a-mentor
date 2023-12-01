import React from 'react'
import Logo from './Logo'
import SidebarRoutes from './SidebarRoutes'

function Sidebar() {
  return (
    <div className='bg-white h-full flex flex-col overflow-y-auto shadow-sm'>
      <div>
        <Logo/>
        <div className="flex flex-col w-full">
          <SidebarRoutes/>


        </div>

      </div>
    </div>
  )
}

export default Sidebar