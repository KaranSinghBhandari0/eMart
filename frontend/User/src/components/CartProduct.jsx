import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartStore } from '../store/CartStore';

export default function CartProduct({ product, quantity }) {

    const { updateCart, deleteCartItem } = CartStore();

    return (
        <div className='flex border-b pb-4'>
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className='rounded my-auto h-12 w-12 md:w-20 md:h-20 object-contain'
                />
            </Link>
            <div className='flex w-full flex-col gap-2 px-3 overflow-hidden'>
                <Link to={`/product/${product._id}`}>
                    <p className='font-medium text-sm md:text-lg truncate'>
                        {product.name}
                    </p>
                </Link>

                <div className='flex justify-between items-center'>
                    <div className="flex gap-2 items-center">
                        <button
                            className="bg-secondary px-2 py-1 rounded text-white hover:bg-secondary-dark transition"
                            onClick={() => updateCart(product._id, quantity - 1)}
                        >
                            <Minus size={12} />
                        </button>

                        <div className="flex items-center gap-2 px-2">
                            <small>Quantity: {quantity}</small>
                        </div>

                        <button
                            className="bg-green-500 px-2 py-1 rounded text-white hover:bg-green-600 transition"
                            onClick={() => updateCart(product._id, quantity + 1)}
                        >
                            <Plus size={12} />
                        </button>
                    </div>

                    <div
                        className='rounded-full border p-2 cursor-pointer hover:bg-red-100 transition'
                        onClick={() => deleteCartItem(product._id)}
                    >
                        <Trash2 size={18} className='text-red-600' />
                    </div>
                </div>
            </div>
        </div>
    )
}
