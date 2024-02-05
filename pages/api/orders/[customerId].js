export default async function handler(req, res) {
    const { customerId } = req.query;
  
    if (req.method !== 'GET') {
      return res.status(405).end('Method Not Allowed');
    }
  
    try {
      console.log(`Fetching orders for customer ID: ${customerId}`);
      console.log(`Request URL: https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json?customer_id=${customerId}`);

      const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-10/orders.json?customer_id=${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch order data from Shopify');
      }
  
      const data = await response.json();
      console.log(`Received data: `, data);
      res.status(200).json(data.orders);
    } catch (error) {
        console.error('Error in API route:', error);
      res.status(500).json({ message: error.message });
    }
  }
 