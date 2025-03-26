import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductStore } from '../store/ProductStore';
import CategoryDropdown from '../components/CategoryDropdown';

export default function AllProducts() {
    const { products, getAllProducts } = ProductStore();
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(()=> {
        getAllProducts();
    }, [])

    // Get unique categories
    const categories = ['All', ...new Set(products.map(product => product.category))];

    // Filter products
    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="flex flex-col sm:flex-row min-h-screen">

            <div className="flex-1 p-6">
                <div className='flex gap-16 px-2'>
                    <p className="text-2xl font-semibold mb-8 text-gray-700">All Products</p>
                    <CategoryDropdown categories={categories} setSelectedCategory={setSelectedCategory} />
                </div>

                <div className="flex flex-wrap gap-10">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <p className="text-lg text-gray-500 col-span-full text-center py-10">
                            No products found in this category.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
