import React from 'react'


interface Props {
    children: React.ReactNode
}


const layout = ({ children }: Props) => {
    return (
        <div className='h-full flex justify-center items-center'>
            {children}
        </div>
    )
}

export default layout