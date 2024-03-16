import fetch from 'node-fetch';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_ACCESSTOKEN = process.env.SHOPIFY_ADMIN_ACCESSTOKEN;

async function createDraftOrder(req, res) {
  const { lineItems } = req.body;

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/draft_orders.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESSTOKEN,
    },
    body: JSON.stringify({
      draft_order: {
        line_items: lineItems,
      },
    }),
  });

  const data = await response.json();

  if (data.draft_order) {
    res.status(200).json({ checkoutUrl: data.draft_order.invoice_url });
  } else {
    res.status(500).json({ error: 'Failed to create draft order' });
  }
}

export default createDraftOrder;