import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductStore } from '../store/ProductStore';

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
            {/* Sidebar for Filters */}
            <div className="w-full sm:w-1/5 lg:w-1/6 p-3 border-r shadow-sm sm:min-h-screen">
                <p className="text-lg font-semibold mb-6 text-gray-700">Filter by Category</p>

                {/* Radio Button Category List */}
                <div className="space-y-3">
                    {categories.map((category, idx) => (
                        <label
                            key={idx}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <input
                                type="radio"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                aria-label={`Filter by ${category}`}
                            />
                            <span className="text-gray-700 text-md">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6">
                <p className="text-2xl font-semibold mb-8 text-gray-800">All Products</p>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
