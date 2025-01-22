import React from 'react';
import {Link} from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className='h-[80vh] flex justify-center items-center w-full mx-auto max-w-7xl'>
        <div className='empty-cart-div flex flex-col items-center mt-3'> 
            <img src='/emptyCart.webp' alt="Empty Cart" className='h-[200px] w-[200px]' />
            <h3>Your Cart is <span className='text-red'>Empty!</span></h3>
            <p>Please come back after adding some items</p>
            <Link to='/'>
              <button className='btn btn-success mt-3'>Shop now</button>
            </Link>
        </div>
    </div>
  )
}
