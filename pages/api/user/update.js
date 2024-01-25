import { dbConnect } from '/utils/dbConnect';
import { verifyToken } from '/utils/auth';
import { ObjectId } from 'mongodb';
import initMiddleware from '/utils/init-middleware';
import Cors from 'cors';

// Reuse the CORS middleware from your signup.js
const corsMiddleware = initMiddleware(
    Cors({
      methods: ['POST', 'HEAD'],
      origin: (origin, callback) => {
        console.log('Incoming origin:', origin);
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    })
  );

export default async function update(req, res) {
  await corsMiddleware(req, res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // Verify the user's token and get their ID
    const token = req.cookies.token;
    const decoded = verifyToken(token);

    // Connect to the database
    const db = await dbConnect();

    // Extract additional fields from the request body
    const { firstName, lastName, email, address, phoneNumber, shippingAddress } = req.body;

    // Update the user's data in the database
    if (email) {
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser && existingUser._id.toString() !== decoded.userId) {
          return res.status(409).json({ success: false, message: 'Email already in use' });
        }
      }
  
      // Update the user's data in the database
      const updateResult = await db.collection('users').updateOne(
        { _id: new ObjectId(decoded.userId) }, // Convert to ObjectId
        { $set: { firstName, lastName, email, address, phoneNumber, shippingAddress } }
      );
  
      if (!updateResult.matchedCount) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
