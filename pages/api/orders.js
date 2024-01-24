// pages/api/orders.js
import { verifyToken } from '/utils/auth';
import fetch from 'node-fetch'; // You may need to install node-fetch if you're using Node.js version < 17.5

export default async function orders(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ success: false, message: 'No authentication token provided' });
    }

    const decoded = verifyToken(token);
    // You need to map your user ID to the Shopify customer ID
    const customerId = decoded.userId; // This is an example, you need to implement this mapping

    // Set up the request headers with your Shopify Partner API credentials
    const headers = {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
    };

    // Make a GET request to the Shopify API to fetch orders for the authenticated user
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-01/orders.json?customer_id=${customerId}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const ordersData = await response.json();

    if (!ordersData.orders.length) {
      return res.status(404).json({ success: true, message: 'No Order History, shop now!' });
    }

    res.status(200).json({ success: true, data: ordersData.orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}