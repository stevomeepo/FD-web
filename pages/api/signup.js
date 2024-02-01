import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '/utils/init-middleware';
import fetch from 'node-fetch';

async function createShopifyCustomer(firstName, lastName, email) {
  const shopifyCustomerData = {
    customer: {
      first_name: firstName,
      last_name: lastName,
      email: email,
    },
  };

  const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/customers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESSTOKEN,
    },
    body: JSON.stringify(shopifyCustomerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error creating Shopify customer: ${errorData.errors}`);
  }

  return response.json();
}

const allowedOrigins = [
  'https://fd-web-weld.vercel.app',
  'http://localhost:3000',
];

const corsMiddleware = initMiddleware(
    Cors({
        methods: ['POST', 'HEAD'],
        origin: (origin, callback) => {
          console.log('Request origin:', origin);
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
      })
    );


    export default async function signup(req, res) {
      await corsMiddleware(req, res);
    
      const { method } = req;
    
      if (method === 'POST') {
        const { client } = await dbConnect();
        const session = client.startSession();
        try {
          session.startTransaction();
          const usersCollection = client.db('FDweb').collection('users');
          const { firstName, lastName, email, password } = req.body;
    
          const existingUser = await usersCollection.findOne({ email });
    
          if (existingUser) {
            await session.abortTransaction();
            return res.status(400).json({ success: false, message: 'Email already exists' });
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
    
          const insertResult = await usersCollection.insertOne({
            firstName,
            lastName,
            email,
            password: hashedPassword,
          }, { session });
    
          if (!insertResult.acknowledged) {
            throw new Error('User could not be created');
          }
    
          const shopifyCustomer = await createShopifyCustomer(firstName, lastName, email);
          const shopifyCustomerId = shopifyCustomer.customer.id;
          await usersCollection.updateOne(
            { _id: insertResult.insertedId },
            { $set: { shopifyCustomerId: shopifyCustomerId } },
            { session }
          );
    
          await session.commitTransaction();
    
          const insertedUser = await usersCollection.findOne({ _id: insertResult.insertedId });
          const token = jwt.sign({ userId: insertedUser._id, shopifyCustomerId: shopifyCustomerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly`);
    
          res.status(201).json({
            success: true,
            data: {
              email: insertedUser.email,
              firstName: insertedUser.firstName,
              shopifyCustomerId: shopifyCustomerId
            }
          });
        } catch (error) {
          await session.abortTransaction();
          res.status(400).json({ success: false, error: error.message });
        } finally {
          await session.endSession();
        }
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
      }
    }
