// pages/api/signup.js
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const pool = new Pool({
      connectionString: process.env.POSTGRESQL_URI,
    });

    const client = await pool.connect();

    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      res.status(422).json({ message: 'User exists already!' });
      client.release();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    res.status(201).json({ message: 'Created user!' });
    client.release();
  }
}