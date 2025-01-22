import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProductRow({ product }) {

    const {setCurrProduct, setOpenModal} = useContext(AppContext);

    const handleModify = (e) => {
        e.preventDefault();
        setCurrProduct(product);
        setOpenModal(true);
    }

  return (
    <div className="flex px-6 py-4 border-b hover:bg-gray-100 items-center text-center"
        key={product.id}
        >
        {/* Columns */}
        <div className="flex-1 flex items-center gap-2">
            <img
            src={product.image}
            alt="Product"
            className="w-10 h-10 object-cover rounded mx-auto"
            />
        </div>
        <p className="text-stone-600 text-sm flex-1">{product.category}</p>
        <p className="text-stone-600 text-sm hidden md:block flex-1">
            ₹{product.price}
        </p>
        <p className="text-stone-600 text-sm hidden md:block flex-1 text-green-500">
            In Stock
        </p>
        <div className="text-sm text-orange-500 cursor-pointer flex-1" onClick={handleModify}>
            Modify
        </div>
    </div>
  );
}
