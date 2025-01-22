import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function CategoryProducts() {
  const { getCategoryProducts, categoryProducts } = useContext(ProductContext);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
        try {
            setLoading(true);
            await getCategoryProducts(category);
        } catch (err) {
            setError("Failed to load category products. Please try again later.");
        } finally {
            setLoading(false);
        }
        };
        fetchCategoryProducts();
    }, [category]);

    if(loading) {
        return (
        <div className="h-screen flex items-center justify-center bg-blue-100">
            <p>Loading...</p>
        </div>
        );
    }

    if(categoryProducts.length === 0) {
        return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-700">No products found in this category.</p>
        </div>
        );
    }

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-6 px-4">

        <div className="flex items-center gap-4 mb-6">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle w-20" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-filter text-xl text-white text-sm"></i>
                </button>
                <ul className="dropdown-menu">
                    <Link to='/product/category/Clothing'>
                        <p className="dropdown-item text-sm cursor-pointer" >Clothing</p>
                    </Link>
                    <Link to='/product/category/Electronics'>
                        <p className="dropdown-item text-sm cursor-pointer" >Electronics</p>
                    </Link>
                    <Link to='/product/category/Furniture'>
                        <p className="dropdown-item text-sm cursor-pointer" >Furniture</p>
                    </Link>
                    <Link to='/product/category/Beauty'>
                        <p className="dropdown-item text-sm cursor-pointer" >Beauty</p>
                    </Link>
                    <Link to='/product/category/Sports'>
                        <p className="dropdown-item text-sm cursor-pointer" >Sports</p>
                    </Link>
                    <Link to='/product/category/ChildCare'>
                        <p className="dropdown-item text-sm cursor-pointer" >ChildCare</p>
                    </Link>
                </ul>
            </div>
            <p className="font-semibold text-2xl font-tilted">{category}</p>
        </div>

        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
        
    </div>
  );
}
