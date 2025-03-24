import { ShoppingCart } from 'lucide-react';
import { ProductStore } from '../store/ProductStore';

export default function CartSummary({ summary, totalItems }) {

    const { handleBuy } = ProductStore();

    return (
        <div className='w-full max-w-80 border shadow-md rounded-xl'>
            <div className='px-4 py-3 border-b'>
                <p className='text-xl font-semibold'>Summary</p>
            </div>

            <div className='py-3 border-b flex flex-col gap-2'>
                <div className='flex justify-between px-4 text-gray-500'>
                    <p>Products</p>
                    <p>₹ {summary}</p>
                </div>
                <div className='flex justify-between px-4 text-gray-500'>
                    <p>Items</p>
                    <p>{totalItems}</p>
                </div>
                <div className='flex justify-between px-4 text-gray-500'>
                    <p>Shipping</p>
                    <p className='text-green-500'>Free</p>
                </div>
            </div>

            <div className='px-4 flex justify-between mt-2'>
                <p className='text-lg font-semibold' >Total amount</p>
                <p className='text-lg font-semibold' >₹ {summary}</p>
            </div>

            <div className='flex flex-col items-center p-4'>
                <button className='bg-primary hover:bg-opacity-90 text-white font-semibold px-8 py-2 rounded flex gap-2' onClick={() => handleBuy(summary)}>
                    <ShoppingCart />
                    Checkout
                </button>
            </div>
        </div>
    )
}
