import React, { useContext } from 'react'
import { PaymentContext } from '../context/PaymentContext'

export default function CartSummary({ summary, totalItems }) {

  const { handleBuy } = useContext(PaymentContext);

  return (
    <div className='w-full max-w-80 bg-white rounded-xl'>
        <div className='px-4 py-3 border-b'>
          <p className='text-xl font-semibold'>Summary</p>
        </div>

        <div className='py-3 border-b flex flex-col gap-2'>
          <div className='flex justify-between px-4'>
            <p>Products</p>
            <p>₹ {summary}</p>
          </div>
          <div className='flex justify-between px-4'>
            <p>Items</p>
            <p>{totalItems}</p>
          </div>
          <div className='flex justify-between px-4'>
            <p>Shipping</p>
            <p className='text-green-500'>Free</p>
          </div>
        </div>

        <div className='px-4 flex justify-between mt-2'>
          <p className='text-lg font-bold' >Total amount</p>
          <p className='text-lg font-bold' >₹ {summary}</p>
        </div>

        <div className='flex flex-col items-center p-4'>
          <button className='bg-black text-white font-semibold px-8 py-2 rounded font' onClick={() => handleBuy(summary)}>
            <i className="fa-solid fa-cart-shopping text-white mr-2"></i> checkout
          </button>
        </div>
    </div>
  )
}
