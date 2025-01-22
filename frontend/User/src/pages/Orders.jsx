import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Orders() {
  const [searchPaymentId, setSearchPaymentId] = useState("");
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const { getOrders, orders, orderDetails, fetchOrderDetails } =
    useContext(AuthContext);

  useEffect(() => {
    setLoadingOrders(true);
    getOrders().finally(() => setLoadingOrders(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingDetails(true);
    await fetchOrderDetails(searchPaymentId);
    setLoadingDetails(false);
  };

  return (
    <div className="w-full min-h-[80vh] max-w-7xl mx-auto p-4">
      {/* Order Details Section */}
      <section className="mt-3 w-full bg-white flex flex-col items-center p-4 rounded shadow-md">
        <h5 className="text-lg md:text-xl font-semibold text-center">
          Fetch Your Order Details
        </h5>
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-3 w-full max-w-md mt-4"
        >
          <input
            type="text"
            className="form-control border border-gray-300 rounded px-3 py-2 w-full"
            placeholder="Enter your payment ID..."
            value={searchPaymentId}
            onChange={(e) => setSearchPaymentId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 rounded-xl px-3 py-2 bg-green-600 text-white w-full md:w-auto border-none hover:bg-green-500"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Order Details Display */}
        {loadingDetails ? (
          <p className="mt-3">Loading order details...</p>
        ) : (
          orderDetails && (
            <div className="mt-4 text-left w-full max-w-md">
              <p>
                <strong>Order ID:</strong> {orderDetails.order_id}
              </p>
              <p>
                <strong>Payment ID:</strong> {orderDetails.id}
              </p>
              <p>
                <strong>Amount:</strong> ₹{orderDetails.amount / 100}
              </p>
              <p>
                <strong>Currency:</strong> {orderDetails.currency}
              </p>
              <p>
                <strong>Status:</strong> {orderDetails.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(orderDetails.created_at).toLocaleDateString()}
              </p>
            </div>
          )
        )}
      </section>

      {/* Orders List Section */}
      <section className="mt-6 bg-white p-4 rounded shadow-md">
        <h3 className="text-lg md:text-xl font-semibold text-center">
          Your Orders
        </h3>
        {loadingOrders ? (
          <p className="mt-3 text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-3 text-center">No Orders found...</p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-sm md:text-base">
                    Order ID
                  </th>
                  <th className="border px-4 py-2 text-sm md:text-base">
                    Payment ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-sm md:text-base"
                  >
                    <td className="border px-4 py-2">{order.orderId}</td>
                    <td className="border px-4 py-2">{order.paymentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
