// components/Orders.js
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useRouter } from 'next/router';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetch('/api/orders')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrders(data.data || []);
          } else {
            setOrders([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setOrders([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4 text-xl font-bold">
            No <span className="text-red-500">Order</span> History...
        </p>
        <button 
            type="button" 
            className="px-6 py-2 rounded-md bg-black hover:bg-red-500 text-white font-bold uppercase border-red border-t border-b border-r"
            onClick={() => router.push('/products')}
        >
            Shop now
        </button>
      </div>
      
    );
  }

  return (
    <div className="orders-container">
      <h2 className="text-lg font-semibold mb-4">Your Orders:</h2>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order._id} className="order-item mb-3 p-4 shadow-lg rounded-lg">
            <h3 className="order-title font-bold mb-2">Order #{order._id}</h3>
            <div className="order-details">
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item._id} className="order-item-details">
                    <p>{item.name} - Qty: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}