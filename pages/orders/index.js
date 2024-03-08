import React, { useEffect, useState, useContext } from 'react';
import { getCustomerOrders } from '../../lib/customer';
import { AuthContext } from '../../context/authContext';
import Link from 'next/link';
import Image from 'next/image';
import { formatter } from '../../utils/helpers';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
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

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

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
        <h1 className="mb-4 text-2xl font-bold text-center">Order <span className="text-red-500">History</span></h1>
        {orders.map((order) => (
          <div key={order.id} className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Order <span className="text-red-500 font-bold">#FD{order.orderNumber}</span></h2>
                <p className="mb-2">Total: {formatter.format(order.totalPriceV2.amount)}</p>
                <p className="mb-2">Purchased on: {new Date(order.processedAt).toLocaleDateString()}</p>
                <p className="mb-2">Fulfillment: {order.fulfillmentStatus ? order.fulfillmentStatus : 'Unfulfilled'}</p>
              </div>
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="bg-black hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {expandedOrderId === order.id ? 'Hide Details' : 'View Order'}
              </button>
            </div>
            {expandedOrderId === order.id && (
              <div className="mt-4 p-4 border-t border-gray-300">
                <p className="font-bold">ORDER <span className="text-red-500">DETAILS</span></p>
                {order.lineItems.edges.map(({ node: lineItem }) => (
                  <div key={lineItem.variant.image.src} className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <img src={lineItem.variant.image.src} alt={lineItem.variant.image.altText || 'Product Image'} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                      <div>
                        <p>{lineItem.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>Qty: {lineItem.quantity}</p>
                      <p>Price: {lineItem.variant.priceV2.amount} {lineItem.variant.priceV2.currencyCode}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-4 border-t border-gray-300">
                  <p>Subtotal: {formatter.format(order.subtotalPriceV2.amount)} {order.subtotalPriceV2.currencyCode}</p>
                  <p>Tax: {formatter.format(order.totalTaxV2.amount)} {order.totalTaxV2.currencyCode}</p>
                  <p>Shipping: {formatter.format(order.totalShippingPriceV2.amount)} {order.totalShippingPriceV2.currencyCode}</p>
                  <p className="font-bold">Total: {formatter.format(order.totalPriceV2.amount)} {order.totalPriceV2.currencyCode}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
