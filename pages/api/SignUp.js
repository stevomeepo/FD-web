import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';

export default async function signup(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body;

        const db = await dbConnect();
        let user = await db.collection('users').findOne({ email });

        if (user) {
          return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await db.collection('users').insertOne({ email, password: hashedPassword });
        const insertedUser = await db.collection('users').findOne({ _id: user.insertedId });

        res.status(201).json({ success: true, data: insertedUser });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
