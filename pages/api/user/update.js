import { dbConnect } from '/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function update(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

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

    const userId = new ObjectId(decoded.userId);
    const { 
      phoneNumber, 
      streetAddress1, 
      streetAddress2, 
      country, 
      state, 
      city, 
      zipcode
    } = req.body;

    // Basic validation example
    if (!phoneNumber || !streetAddress1 || !state || !city || !zipcode) {
      return res.status(400).json({ message: 'All address fields except Street Address 2 are required' });
    }

    const address = {
      streetAddress1,
      streetAddress2,
      country,
      state,
      city,
      zipcode
    }

    const db = await dbConnect();
    const updateResult = await db.collection('users').updateOne(
      { _id: userId },
      { $set: { phoneNumber, address } }
    );

    if (!updateResult.modifiedCount) {
      return res.status(404).json({ message: 'User not found or data not modified' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error in profile update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
