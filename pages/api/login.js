import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        let { email, password } = req.body;
        email = email.toLowerCase();

        const db = await dbConnect();
        let user = await db.collection('users').findOne({ email });

        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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