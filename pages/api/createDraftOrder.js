import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cartItems } = req.body;

    const SHOPIFY_ADMIN_API_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`;
    const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;

    const mutation = `
      mutation draftOrderCreate($input: DraftOrderInput!) {
        draftOrderCreate(input: $input) {
          draftOrder {
            id
            invoiceUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const lineItems = cartItems.map(item => ({
      variantId: item.id,
      quantity: item.variantQuantity,
      customAttributes: [
        { key: "Configurations", value: JSON.stringify(item.configurations) }
      ]
    }));

    const variables = {
      input: {
        lineItems
      }
    };

    try {
      const response = await axios.post(SHOPIFY_ADMIN_API_URL, {
        query: mutation,
        variables,
      }, {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.data.draftOrderCreate.userErrors.length > 0) {
        return res.status(400).json({ error: response.data.data.draftOrderCreate.userErrors });
      }

      return res.status(200).json({ invoiceUrl: response.data.data.draftOrderCreate.draftOrder.invoiceUrl });
    } catch (error) {
      console.error('Error creating draft order:', error);
      return res.status(500).json({ error: 'Failed to create draft order', details: error.response.data });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
