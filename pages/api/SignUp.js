import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function signup(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { firstName, lastName, email, password } = req.body;

        const db = await dbConnect();
        let user = await db.collection('users').findOne({ email });

        if (user) {
          return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await db.collection('users').insertOne({ firstName, lastName, email, password: hashedPassword });
        const insertedUser = user.ops[0];
        console.log(insertedUser);
        
        const token = jwt.sign({ userId: insertedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly`);

        res.status(201).json({ success: true, data: { email: insertedUser.email, firstName: insertedUser.firstName } });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
