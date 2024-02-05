import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import Link from 'next/link';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('Fetching Orders');
    const fetchOrders = async () => {
        console.log('Inside fetchOrders function'); // Check if this function is called
        if (user && user.shopifyCustomerId) {
            try {
                console.log('Making API call', `/api/orders/${user.shopifyCustomerId}`);
                const response = await fetch(`/api/orders/${user. shopifyCustomerId}`);
                if (!response.ok) {
                  throw new Error(`Failed to fetch orders: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Data received', data); // This should log the data
                setOrders(data);
              } catch (error) {
                console.error('Error fetching orders:', error);
                console.error('Response status:', error.response?.status || 'No response status');
              }
        }
      };

    fetchOrders();
  }, [user]);

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
          <p>Order Number: {order.order_number}</p> 
          <p>Status: {order.fulfillment_status ? order.fulfillment_status : 'Pending'}</p>
          <p>Total Price: {order.current_total_price}</p>
          <a href={order.order_status_url}>Order Details</a>
        </div>
        ))
      ) : (
        <div className="text-center">
          <p className="text-4xl font-bold text-black mb-4">No <span className="text-red-500">Order History</span></p>
          {/* Link to the shop or products page */}
          <Link href="/products">
            <button className="px-6 rounded-r-md bg-black hover:hover:bg-red-500 text-white hover:text-white font-bold text-xs p-2 uppercase border-red border-t border-b border-r">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}