import React from 'react'
import Sidebar from './_components/Sidebar'

function layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <div className='h-full'>
            <div className='hidden md:flex w-56 fixed z-50 flex-col inset-0 '>
                <Sidebar />
            </div>
            {children}

        </div>
    )
}

export default layout