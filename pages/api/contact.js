// pages/api/contact.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    try {
      await axios.post('https://api.airtable.com/v0/app3awdoqk11Oqz6c/Contact', {
        fields: { name, email, subject, message },
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Failed to save to Airtable' });
      return;
    }

    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}