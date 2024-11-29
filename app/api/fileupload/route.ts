// import { NextApiRequest, NextApiResponse } from "next";
// import { uploadToS3 } from "@/lib/S3";  // Ensure your S3 logic is here

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { file_key, file_name } = req.body;
//     const data = await uploadToS3({ file_key, file_name });  // Upload to S3 logic here

//     // Simulate chat creation logic
//     const chat_id = "generated_chat_id"; // Replace with real chat creation logic

//     return res.status(200).json({ chat_id });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "File upload failed" });
//   }
// }
