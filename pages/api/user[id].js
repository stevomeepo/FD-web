import { ObjectId } from 'mongodb';
import { dbConnect } from '/utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.id !== req.query.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const db = await dbConnect();
      const { id } = req.query;
      const { firstName, lastName, email, phoneNumber, shippingAddress } = req.body;

      const response = await db.collection('users').updateOne(
        { _id: ObjectId(id) },
        { $set: { firstName, lastName, email, phoneNumber, shippingAddress } }
      );

      if (response.modifiedCount === 1) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      res.status(500).json({ message: 'Error updating user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}