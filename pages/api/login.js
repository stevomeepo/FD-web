import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function fetchShopifyCustomer(shopifyCustomerId) {
  const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/customers/${shopifyCustomerId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error fetching Shopify customer: ${errorData.errors}`);
  }

  return response.json();
}

export default async function login(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const { client } = await dbConnect();
        const usersCollection = client.db('FDweb').collection('users');
        let user = await usersCollection.findOne({ email });

        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        if (user.shopifyCustomerId) {
          const shopifyCustomerData = await fetchShopifyCustomer(user.shopifyCustomerId);
          if (shopifyCustomerData.customer.first_name !== user.firstName || shopifyCustomerData.customer.last_name !== user.lastName) {
            await usersCollection.updateOne(
              { _id: user._id },
              { $set: { firstName: shopifyCustomerData.customer.first_name, lastName: shopifyCustomerData.customer.last_name } }
            );
          }
        }

        const token = jwt.sign({ userId: user._id, shopifyCustomerId: user.shopifyCustomerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly`);

        res.status(200).json({ success: true, data: { email: user.email, firstName: user.firstName } });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
