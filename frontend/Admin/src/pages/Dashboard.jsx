import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ProductRow from "../components/ProductRow";

import { AppContext } from "../context/AppContext";
import Modal from "../components/Modal";

export default function Dashboard() {
  const { products, getAllProducts } = useContext(AppContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-screen h-screen max-h-screen md:pl-2 flex">
      <Sidebar />

      <div className="w-full m-4 rounded-lg bg-white shadow-md overflow-y-scroll">

        <div className="flex justify-between px-6 py-3 border-b">
          <p className="text-stone-800 font-semibold text-lg">Products List</p>
          <div className="flex gap-4">
            <button className="px-2 py-1 rounded text-sm border text-slate-500 flex gap-1 items-center hover:bg-gray-200">
              <i className="fa-solid fa-filter"></i> Filter
            </button>
            <Link to='/newProduct' >
              <button className="px-2 py-1 rounded text-sm bg-purple-500 text-white hover:bg-purple-600">
                + Add
              </button>
            </Link>
          </div>
        </div>

        <div className="flex px-6 py-2 bg-gray-50 border-b items-center text-center">
          <small className="text-stone-600 flex-1">Product</small>
          <small className="text-stone-600 flex-1">Category</small>
          <small className="text-stone-600 flex-1 hidden md:block">Price</small>
          <small className="text-stone-600 flex-1 hidden md:block">Stock</small>
          <small className="text-stone-600 flex-1">Activity</small>
        </div>

        <div className="flex flex-col max-h-[calc(100%-80px)]">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center text-stone-500 py-6">
              No products available. Add new products to get started!
            </div>
          )}
        </div>

      </div>
          
      <Modal/>

    </div>
  );
}
