// pages/api/save-order.js
import { dbConnect } from '/utils/dbConnect';
import { verifyToken } from '/utils/auth';

export default async function saveOrder(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ success: false, message: 'No authentication token provided' });
    }

    const decoded = verifyToken(token);
    const db = await dbConnect();
    const user = await db.collection('users').findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const order = req.body;
    order.userId = decoded.userId;
    order.date = new Date();

    const result = await db.collection('orders').insertOne(order);
    if (!result.acknowledged) {
      throw new Error('Order could not be saved');
    }

    res.status(201).json({ success: true, message: 'Order saved', orderId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}