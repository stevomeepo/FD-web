import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.shopifyCustomerId) {
        try {
          const response = await fetch(`/api/orders/${user.shopifyCustomerId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order Number: {order.order_number}</p>
        </div>
      ))}
    </div>
  );
}