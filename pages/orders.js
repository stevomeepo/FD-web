import React, { useEffect, useState, useContext } from 'react';
import { getCustomerOrders } from '../lib/customer';
import { AuthContext } from '../context/authContext';
import Link from 'next/link'; // Import Link from next/link for navigation

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
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1>No Order History!</h1>
        <p>You haven't placed any orders yet.</p>
        <Link href="/products" passHref> {/* Update the href to your products page path */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders.map(({ node: order }) => (
        <div key={order.id}>
          <h2>Order #{order.orderNumber}</h2>
          <p>Total: {order.totalPrice.amount} {order.totalPrice.currencyCode}</p>
          <ul>
            {order.lineItems.edges.map(({ node: item }) => (
              <li key={item.title}>{item.title} - Quantity: {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
