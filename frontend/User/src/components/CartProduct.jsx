import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartProduct({product, quantity}) {

    const { updateCart, deleteCartItem } = useContext(CartContext);

return (
    <div className='flex border-b pb-2' >
        <img src={product.image} alt="" className='rounded h-24 w-28' />
        <div className='flex w-full flex-col gap-2 px-3'>
        <p className='text-sm w-full md:text-base line-clamp-2'>
            {product.name}
        </p>

        <div className='flex justify-between items-center'>
            <div className="flex gap-1">
                <button className="bg-black px-1 rounded" onClick={() => updateCart(product._id, quantity - 1)}>
                    <i className="fas fa-minus text-white"></i>
                </button>

                <div className="flex items-center gap-2 px-2">
                    <small>Quantity: {quantity}</small>
                </div>

                <button className="bg-black px-1 rounded" onClick={() => updateCart(product._id, quantity + 1)}>
                    <i className="fas fa-plus text-white"></i>
                </button>
            </div>
            <div className='rounded-full border px-2 py-1 cursor-pointer' onClick={()=> {deleteCartItem(product._id)}}>
            <i className='fa-solid fa-trash text-red-600'></i>
            </div>
        </div>
        
        </div>
    </div>
  )
}
