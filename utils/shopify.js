import fetch from 'node-fetch';

export async function updateShopifyCustomer(customerId, customerData) {
  try {
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-01/customers/${customerId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
      },
      body: JSON.stringify({ customer: customerData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update customer');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating Shopify customer:', error);
    throw error;
  }
}
  