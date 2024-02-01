import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { dbConnect } from '/utils/dbConnect';

export default async function update(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    console.log('Token:', token);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Invalid token' });
      } else if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        throw error;
      }
    }

    console.log('Decoded:', decoded);

    const shopifyCustomerId = decoded.shopifyCustomerId;
    if (!shopifyCustomerId) {
      return res.status(400).json({ message: 'Shopify customer ID not found in token' });
    }

    const { firstName, lastName, email, phoneNumber, address } = req.body;

    // Validate input data as needed

    const shopifyUpdateData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phoneNumber,
      addresses: [address], // Ensure this matches Shopify's expected address format
    };

    console.log('Received req.body:', req.body);
    console.log('shopifyUpdateData:', shopifyUpdateData);

    const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-01/customers/${shopifyCustomerId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
      },
      body: JSON.stringify({ customer: shopifyUpdateData }),
    });

    if (!response.ok) {
      throw new Error('Failed to update customer');
    }

    const shopifyResponse = await response.json();

    const { db } = await dbConnect();
    const mongoUpdateResult = await db.collection('users').updateOne(
      { shopifyCustomerId: shopifyCustomerId },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          address: address
        }
      }
    );

    if (mongoUpdateResult.matchedCount === 0) {
      console.error('User not found in MongoDB');
    }
    res.status(200).json({ message: 'Profile updated successfully', shopifyResponse });
  } catch (error) {
    console.error('Error in profile update:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
