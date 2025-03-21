import React from 'react'

export default function CartFooter() {
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    return (
        <div className='w-full flex flex-col gap-4 items-center mt-4'>
            <div className="w-full border shadow-sm rounded-xl p-3">
                <p className='text-lg font-medium'>Expected shipping delivery</p>
                <p className="mt-2 text-gray-600">
                    {estimatedDelivery.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
            <div className="w-full p-4 border shadow-sm rounded-xl">
                <p className='text-lg font-semibold'>We Accept</p>
                <div className='flex gap-4 mt-2'>
                    <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa" />
                    <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                        alt="American Express" />
                    <img className="me-2" width="45px"
                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard" />
                    <img className="me-2" width="45px"
                        src="https://cdn.iconscout.com/icon/free/png-512/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp&w=512"
                        alt="PayPal acceptance mark" />
                </div>
            </div>
        </div>
    )
}
