import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/lib/config/dbConfig'; // Ensure this path is correct
import User from '@/lib/models/auth'; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the database is connected
  await connect();

  if (req.method === 'GET') {
    // Extract email from query parameters
    const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Find the user by email and return the chats array
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the user's chats
      res.status(200).json(user.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
      res.status(500).json({ error: 'Failed to fetch chats' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
