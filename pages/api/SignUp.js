import { dbConnect } from '/utils/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cors from 'cors';
import initMiddleware from '/utils/init-middleware';

const allowedOrigins = [
  'https://fd-ft6isgvpe-stevomeepo.vercel.app',
];

const corsMiddleware = initMiddleware(
  Cors({
    methods: ['POST', 'HEAD'],
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);


export default async function signup(req, res) {
  await corsMiddleware(req, res);

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { firstName, lastName, email, password } = req.body;

        const db = await dbConnect();
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
          return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertResult = await db.collection('users').insertOne({
          firstName,
          lastName,
          email,
          password: hashedPassword
        });

        if (!insertResult.acknowledged) {
          throw new Error('User could not be created');
        }

        const insertedUser = await db.collection('users').findOne({ _id: insertResult.insertedId });

        const token = jwt.sign({ userId: insertedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly`);

        res.status(201).json({ success: true, data: { email: insertedUser.email, firstName: insertedUser.firstName } });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
