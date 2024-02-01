import { dbConnect } from '/utils/dbConnect';
import { ObjectId } from 'mongodb';
import { verifyToken } from '/utils/auth';

export default async function check(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = verifyToken(token);
      console.log('Token decoded:', decoded);

      const { db } = await dbConnect(); // Make sure to destructure the db object
      const userId = new ObjectId(decoded.userId);
      const user = await db.collection('users').findOne({ _id: userId });

      if (!user) {
        console.log('User not found for ID:', decoded.userId);
        return res.status(404).json({ message: 'User not found' });
      }

      const { password, ...userInfo } = user;
      res.status(200).json({ user: userInfo });
    } catch (error) {
      console.error('Error verifying token or querying database:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
