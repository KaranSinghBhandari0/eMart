import React, { useContext, useEffect, useState } from 'react';

import EmptyCart from '../components/EmptyCart';
import CartSummary from '../components/CartSummary';
import CartFooter from '../components/CartFooter';
import CartProduct from '../components/CartProduct';
import Spinner from '../components/Spinner';

import { CartContext } from '../context/CartContext';

export default function Cart() {

  const { cartProducts, getCart } = useContext(CartContext);
  const [fetchingCart, setFetchingCart] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      await getCart();
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setFetchingCart(false);
    }
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  if(fetchingCart) {
    return (
      <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
        <Spinner />
        <p>Loading Cart...</p>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-6 px-2 flex items-start gap-6 lg:flex-row flex-col-reverse">
      <div className="w-full">
        <div className="bg-white rounded-xl">
          <p className="text-2xl font-semibold p-4">Cart</p>
          <div className="flex flex-col gap-4 border-t p-4">
            {cartProducts.map((obj) => (
              <CartProduct 
                key={obj.product._id} 
                product={obj.product} 
                quantity={obj.quantity}
              />
            ))}
          </div>
        </div>
        <CartFooter />
      </div>
      <CartSummary summary={calculateSubtotal()} totalItems={cartProducts.length} />
    </div>
  );
}
