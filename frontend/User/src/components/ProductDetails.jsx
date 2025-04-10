import React from "react";

export default function ProductDetails() {
    return (
        <div className="flex flex-col gap-4 py-4 border-t">

            <div className="flex items-center gap-3">
                <img src="/fast-delivery.png" alt="" className='h-8 w-8' />
                <p className='text-gray-700'>
                    Fast & Secure Delivery
                </p>
            </div>

            <div className="flex items-center gap-3">
                <img src="/returns.png" alt="" className='h-8 w-8' />
                <p className='text-gray-700'>
                    3 Days Return Policy
                </p>
            </div>

            <div className="flex items-center gap-3">
                <img src="/guarantee-certificate.png" alt="" className='h-8 w-8' />
                <p className='text-gray-700'>
                    Money Back Guarantee
                </p>
            </div>

            <div className="flex items-center gap-3">
                <img src="/24_7_support.png" alt="" className='h-8 w-8' />
                <p className='text-gray-700'>
                    24 X 7 Service
                </p>
            </div>

        </div>
    );
}
