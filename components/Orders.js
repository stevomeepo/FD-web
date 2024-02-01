import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        // Redirect to login or handle unauthenticated user
        return;
      }

      try {
        const response = await fetch(`/api/orders?customer_id=${user.customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include any necessary headers for authentication
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.statusText}`);
        }

        const ordersData = await response.json();
        setOrders(ordersData.orders);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (!orders.length) {
    return <p>No order history available.</p>;
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id}>
          {/* Render order details */}
          <p>Order ID: {order.id}</p>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}