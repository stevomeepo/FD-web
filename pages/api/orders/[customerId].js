export default async function handler(req, res) {
    const { customerId } = req.query;
  
    if (req.method !== 'GET') {
      return res.status(405).end('Method Not Allowed');
    }
  
    try {
      const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-01/orders.json?customer_id=${customerId}`, {
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
      res.status(200).json(data.orders);
    } catch (error) {
      console.error('Error fetching Shopify order data:', error);
      res.status(500).json({ message: error.message });
    }
  }
  