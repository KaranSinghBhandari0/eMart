import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';

import { ProductContext } from "../context/ProductContext";
import { PaymentContext } from "../context/PaymentContext";
import { CartContext } from '../context/CartContext';

export default function ShowProduct() {
    
    const {product, getProductDetails} = useContext(ProductContext);
    const {addToCart} = useContext(CartContext);
    const {handleBuy} = useContext(PaymentContext);

    const {id} = useParams();

    useEffect(()=> {
        getProductDetails(id);
    },[]);

    if(!product) {
        return (
            <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                <Spinner />
                <p>Loading...</p>
            </div>
        )
    }

return (
    <div className='min-h-[80vh] max-w-7xl mx-auto py-16'>

        <div className='flex flex-col items-center'>
            <img src={product.image} alt="" 
            className='max-w-[300px] max-h-[300px] rounded-3xl' />

            <div className='w-full flex flex-col p-4 gap-3'>
                <p className='font-bold text-xl'>{product.name}</p>
                <p> <span className='font-semibold'>Description :</span> {product.description}</p>
                <div className='flex gap-2 items-center'>
                    <div className='w-4 h-4 bg-green-500 rounded-full'>
                    </div>
                    <span className='text-green-500'>In stock</span>
                </div>
                <p className='text-lg'><span className='font-semibold'> Price: </span> ₹ {product.price.toLocaleString('en-IN')}</p>
            </div>

            <div className='w-full max-w-2xl flex px-2 gap-1'>
                <button className='text-white bg-green-500 hover:bg-green-600 w-full p-2 rounded-l-3xl' 
                onClick={()=> handleBuy(product.price)}>
                    Buy Now
                </button>
                <button className='text-white bg-purple-500 hover:bg-purple-600 w-full p-2 rounded-r-3xl'
                onClick={() => addToCart(product)} >
                    Add To Cart
                </button>

            </div>
        </div>
    </div>
  )
}
