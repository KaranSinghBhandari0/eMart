import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { AppContext } from '../context/AppContext';


export default function Orders() {
    const { orders, updateOrderStatus } = useContext(AppContext);

    return (
        <div className="w-screen h-screen max-h-screen md:pl-2 flex overflow-scroll scrollbar-hide">
            <Sidebar />

            <div className="w-full m-4 rounded-lg bg-white shadow-md overflow-y-scroll overflow-x-scroll min-w-[768px] scrollbar-hide p-4">

                <p className='text-gray-700 font-medium text-xl'>
                    Orders
                </p>

                <div className="overflow-x-auto border rounded-lg mt-4 scrollbar-hide">
                    <table className="min-w-full shadow-md rounded-lg">
                        <thead className="border-b">
                            <tr className="text-left">
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-36">Order ID</th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-80">Product</th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-40">Date</th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-32">Amount</th>
                                <th className="px-6 py-3 text-sm font-medium uppercase tracking-wider w-28" >Quantity</th>
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
                                        <div className="flex items-center">
                                            <img src={order.productImage} alt={order.productName} className="w-10 h-10 rounded-md object-contain" />
                                            <div className="ml-4 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                                                <p className="text-sm font-medium text-gray-900 truncate">{order.productName}</p>
                                                <p className="text-sm text-gray-500">{order.category}</p>
                                            </div>
                                        </div>
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
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order.orderId, order.userId, e.target.value)}
                                            className='text-xs p-2 border rounded-lg text-gray-700'
                                        >
                                            <option value="Shipping">Shipping</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
