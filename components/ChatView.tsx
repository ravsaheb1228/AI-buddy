// import type { NextApiRequest, NextApiResponse } from 'next';
// import connect from
// import User from '@/lib/models/auth';

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   await mongoose.connect(process.env.MONGODB_URI!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId } = req.query;

//   if (req.method === 'GET') {
//     try {
//       await connectToDatabase();

//       const user = await User.findById(userId).select('chats');

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json(user.chats);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
