import React, { useEffect, useState, useContext } from 'react';
import { getCustomerOrders } from '../lib/customer';
import { AuthContext } from '../context/authContext';
import Link from 'next/link';
import Image from 'next/image';
import { formatter } from '../utils/helpers';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.customerAccessToken) {
        const fetchedOrders = await getCustomerOrders(user.customerAccessToken);
        setOrders(fetchedOrders);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-md p-8 border-2 border-gray-300 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-black mb-4 text-center">No Order History!</h1>
          <p className="text-center text-xl mb-4">You haven't placed any orders yet.</p>
          <Link href="/products" passHref>
            <button className="w-full bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-2xl p-8 border-2 border-gray-300 rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Order History</h1>
        {orders.map(({ node: order }) => (
          <div key={order.id} className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Order <span className="text-red-500 font-bold">#FD{order.orderNumber}</span></h2>
              <p className="mb-2">Total: {formatter.format(order.totalPrice.amount)}</p>
              <p className="mb-2">Purchased on: {new Date(order.processedAt).toLocaleDateString()}</p>
              <p className="mb-2">Fulfillment: {order.fulfillmentStatus ? order.fulfillmentStatus : 'Unfulfilled'}</p>
            </div>
            <Link href={`/orders/${encodeURIComponent(order.id)}`} passHref>
              <button className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                View Order
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
