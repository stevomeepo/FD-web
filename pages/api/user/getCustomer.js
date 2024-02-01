export default async  function handler(req, res) {
    const { customerId } = req.query;
    try {
        const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-01/customers/${customerId}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user data from Shopify');
        }
    
        const data = await response.json();
        res.status(200).json(data.customer);
      } catch (error) {
        console.error('Error fetching Shopify user data:', error);
        res.status(500).json({ message: error.message });
    }
}