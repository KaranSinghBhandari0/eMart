import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

import EmptyOrders from '../components/EmptyOrders';
import ProductCard from '../components/ProductCard';
import { AuthStore } from '../store/AuthStore';
import { ProductStore } from '../store/ProductStore';

export default function Orders() {
    const { orders, isAuthenticated } = AuthStore();
    const { products, getAllProducts } = ProductStore();

    useEffect(() => {
        isAuthenticated();
        getAllProducts();
    }, [])

    return (
        <div className='w-full'>
            <div className='w-full max-w-6xl mx-auto p-4'>
                <p className='text-2xl text-gray-800 font-semibold py-4 px-2'>
                    Order History
                </p>

                {orders.length == 0 ?
                    <EmptyOrders />
                    :
                    <>
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="min-w-full shadow-md">
                                <thead className="border-b">
                                    <tr className="text-left">
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-36">Order ID</th>
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-80">Product</th>
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-40">Date</th>
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-32">Amount</th>
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-24">Quantity</th>
                                        <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-28">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {orders.map((order, index) => (
                                        <tr key={index} className="text-left hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap w-36">
                                                <p className="text-sm font-medium text-gray-900">{order.orderId}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-80">
                                                <Link to={`/product/${order.productId}`} className="flex items-center">
                                                    <img src={order.productImage} alt={order.productName} className="w-10 h-10 rounded-md object-contain" />
                                                    <div className="ml-4 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                                        <p className="text-sm font-medium text-gray-900 truncate">{order.productName}</p>
                                                        <p className="text-sm text-gray-500">{order.category}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-40">
                                                <p className="text-sm text-gray-500">{order.date}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-32">
                                                <p className="text-sm text-gray-500">
                                                    ₹ {(order.amount).toLocaleString("en-IN")}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-24"> {/* New column */}
                                                <p className="text-sm text-gray-500">{order.quantity}</p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap w-28">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Delivered'
                                                        ? 'bg-green-100 text-green-800'
                                                        : order.status === 'Shipping'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : order.status === 'Out for Delivery'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                        <Link
                            to="/allProducts"
                            className="px-6 py-3 bg-primary text-white font-semibold rounded-full transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg my-4 flex items-center gap-2 w-fit"
                        >
                            Continue Shopping <ArrowRight size={20} />
                        </Link>
                    </>
                }
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