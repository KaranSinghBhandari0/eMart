import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

import EmptyCart from '../components/EmptyCart';
import CartSummary from '../components/CartSummary';
import CartFooter from '../components/CartFooter';
import CartProduct from '../components/CartProduct';
import ProductCard from '../components/ProductCard';
import { ProductStore } from '../store/ProductStore';
import { CartStore } from '../store/CartStore';

export default function Cart() {
    const { cartProducts, loading, getCart } = CartStore();
    const { products, getAllProducts } = ProductStore();

    useEffect(() => {
        getCart();
        getAllProducts();
    }, []);

    const calculateSubtotal = () => {
        return cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    if (loading) {
        return (
            <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                <p>Loading Cart...</p>
            </div>
        );
    }

    if (!loading && cartProducts.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div>
            <div className="min-h-screen max-w-7xl mx-auto py-6 px-2 flex items-start gap-6 lg:flex-row         flex-col-reverse">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="border shadow-sm rounded-xl">
                        <p className="text-2xl text-gray-800 font-semibold p-4">
                            Cart
                        </p>
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
                    <Link
                        to="/allProducts"
                        className="px-6 py-3 bg-primary text-white font-medium rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg flex justify-center items-center gap-2 my-8 w-56"
                    >
                        Continue Shopping <ArrowRight size={20} />
                    </Link>
                    <CartFooter />
                </div>
                <CartSummary summary={calculateSubtotal()} totalItems={cartProducts.length} />
            </div>
            <div className="hidden md:block">
                <p className="text-2xl text-gray-700 font-semibold text-center mt-6">
                    Related <span className="text-primary"> Products </span>
                </p>
                <div className="flex justify-evenly flex-wrap gap-6 p-4">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className="relative flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>

                    <Link
                        to="/allProducts"
                        className="flex items-center justify-center bg-gray-300 border w-10 h-10 rounded-full mx-4"
                    >
                        <ChevronDown size={18} />
                    </Link>

                    <div className="flex-1 border-t border-gray-300"></div>
                </div>
            </div>
        </div>
    );
}
