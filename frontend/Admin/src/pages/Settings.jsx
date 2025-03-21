import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Settings() {
    return (
        <div className='w-screen h-screen max-h-screen md:pl-2 flex'>
            <Sidebar />

            <div className='w-full flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <img src="/coming-soon.png" alt="" className='w-[200px] h-200px]' />
                    <span className='text-lg' id='color-changing-text'>Feature Coming Soon !</span>
                </div>
            </div>
        </div>
    )
}
