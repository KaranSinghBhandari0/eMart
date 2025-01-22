import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/CartContext';

export default function Card({ product }) {
    const navigate = useNavigate();

    const {addToCart} = useContext(CartContext);

    const handleProduct = (id) => {
        navigate(`/product/${id}`);
    }

    return (
      <div className="card mx-auto w-72 border-none overflow-hidden shadow-md rounded-lg">
        <img src={product.image} alt={product.title} className="h-48 w-full object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105" onClick={() => handleProduct(product._id)} />
        <div className="card-body p-4">
            <p className="card-title text-black text-lg truncate" title={product.title}>
                {product.name}
            </p>
            <p className="card-text text-gray-600 text-base my-2">
                ₹ {(product.price || 0).toLocaleString('en-IN')}
            </p>
            <button className="btn bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                onClick={() => addToCart(product)}>
                Add to cart
            </button>
        </div>
      </div>
    );
}
  