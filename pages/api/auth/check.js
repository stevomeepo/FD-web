import { dbConnect } from '/utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function check(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const db = await dbConnect();
      const user = await db.collection('users').findOne({ _id: decoded.userId });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const { password, ...userInfo } = user;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
