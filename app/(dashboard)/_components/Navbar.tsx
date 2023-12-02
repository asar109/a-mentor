import React from 'react'
import MobileNavbar from './MobileNavbar'
import TopNavbar from '@/components/TopNavbar'


function Navbar() {
  return (
    <div className='flex items-center p-4 bg-white shadow-sm border h-full  '>
        <MobileNavbar/>
        <TopNavbar/>
        
    </div>
  )
}

export default Navbar