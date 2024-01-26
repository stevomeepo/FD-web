import { dbConnect } from '/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function check(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded); // Log the decoded token

      // Convert userId to ObjectId before querying
      const userId = new ObjectId(decoded.userId);

      const db = await dbConnect();
      const user = await db.collection('users').findOne({ _id: userId });

      if (!user) {
        console.log('User not found for ID:', decoded.userId); // Log if user not found
        return res.status(401).json({ message: 'User not found' });
      }

      const { password, ...userInfo } = user;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      console.error('Error verifying token or querying database:', error); // Log any error during verification or database query
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
