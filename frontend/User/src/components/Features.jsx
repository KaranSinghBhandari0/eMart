import React from 'react'

export default function Features() {
    return (
        <div className='mt-12 w-full max-w-7xl mx-auto'>
            <div className='w-full bg-slate-200 py-4 px-4 sm:px-8 md:px-24 rounded flex flex-col md:flex-row justify-between items-center'>
                <div className='text-center md:text-left'>
                    <p className='text-lg font-medium'>
                        <span className='text-secondary'>25% Up to </span> off all Products
                    </p>
                    <p className='text-2xl text-gray-900 sm:text-3xl md:text-4xl font-semibold mt-4 sm:mt-6'>
                        Stay home & get your daily <br className='hidden sm:block' />
                        <span className='mt-2 sm:mt-4'>Needs from our shop</span>
                    </p>

                    <div className='mt-4 sm:mt-6 flex items-center bg-white rounded-3xl p-1 shadow-md w-full max-w-md mx-auto md:mx-0'>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className='px-4 py-2 outline-none flex-grow bg-transparent w-0 min-w-[120px]' // Adjusted width
                        />
                        <button className='bg-secondary text-sm md:text-base text-white px-4 sm:px-6 py-2 rounded-3xl font-medium whitespace-nowrap'>
                            Subscribe
                        </button>
                    </div>
                </div>
                <img
                    src="/subscribe_banner.png"
                    alt=""
                    className='w-48 h-48 sm:w-64 sm:h-64 mt-6 md:mt-4'
                />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-4'>
                <div className='flex items-center gap-3'>
                    <img src="/fast-delivery.png" alt="" className='h-12 w-12' />
                    <div>
                        <p className='text-gray-900 font-semibold'>
                            Fast & Secure Delivery
                        </p>
                        <p className='text-gray-600 text-sm'>
                            Tell about your service.
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <img src="/returns.png" alt="" className='h-12 w-12' />
                    <div>
                        <p className='text-gray-900 font-semibold'>
                            3 Days Return Policy
                        </p>
                        <p className='text-gray-600 text-sm'>
                            No question ask.
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <img src="/guarantee-certificate.png" alt="" className='h-12 w-12' />
                    <div>
                        <p className='text-gray-900 font-semibold'>
                            Money Back Guarantee
                        </p>
                        <p className='text-gray-600 text-sm'>
                            Within 5 business days.
                        </p>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <img src="/24_7_support.png" alt="" className='h-12 w-12' />
                    <div>
                        <p className='text-gray-900 font-semibold'>
                            24 X 7 Service
                        </p>
                        <p className='text-gray-600 text-sm'>
                            Online service for customer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
