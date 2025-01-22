import React from 'react'

export default function CartFooter() {
  return (
    <div className='w-full flex flex-col gap-4 items-center mt-4'>
        <div className="w-full bg-white rounded-xl p-3">
            <p className='text-lg font-semibold'>Expected shipping delivery</p>
            <p className="mt-2">03.01.2025 - 10.01.2025</p>
        </div>
        <div className="w-full p-4 bg-white rounded-xl">
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
                src="https://www.paypalobjects.com/webstatic/mktg/logo-center/PP_Acceptance_Marks_for_LogoCenter_150x94.png"
                alt="PayPal acceptance mark" />
        </div>
        </div>
    </div>
  )
}
