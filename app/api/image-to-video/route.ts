// import { NextResponse } from 'next/server';
// import fs from 'node:fs';
// import axios, { AxiosResponse } from 'axios';
// import FormData from 'form-data';
// import formidable, { IncomingForm, Fields, Files } from 'formidable';
// import { promisify } from 'util';

// interface GenerateResponse {
//   id: string;
// }

// type VideoResponse = AxiosResponse<Buffer>;

// // Promisify the form parsing method
// const parseForm = promisify((req: any, cb: (err: any, fields: Fields, files: Files) => void) => {
//   const form = new IncomingForm();
//   form.parse(req, cb);
// });

// async function generateVideo(imagePath: string): Promise<string> {
//   const data = new FormData();
//   data.append("image", fs.createReadStream(imagePath), "image.png");
//   data.append("seed", "0");
//   data.append("cfg_scale", "1.8");
//   data.append("motion_bucket_id", "127");

//   try {
//     const response: AxiosResponse<GenerateResponse> = await axios.request({
//       url: `https://api.stability.ai/v2beta/image-to-video`,
//       method: "POST",
//       validateStatus: undefined,
//       headers: {
//         authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//         ...data.getHeaders(),
//       },
//       data: data,
//     });

//     if (response.status === 200) {
//       return response.data.id;
//     } else {
//       throw new Error(`Request failed with status ${response.status}`);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("An error occurred:", error.message);
//       throw new Error('Failed to generate video');
//     } else {
//       console.error("An unexpected error occurred:", error);
//       throw new Error('Failed to generate video');
//     }
//   }
// }

// async function fetchVideo(generationID: string): Promise<Buffer> {
//   try {
//     const response: VideoResponse = await axios.request({
//       url: `https://api.stability.ai/v2beta/image-to-video/result/${generationID}`,
//       method: "GET",
//       validateStatus: undefined,
//       responseType: "arraybuffer",
//       headers: {
//         Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//         Accept: "video/*",
//       },
//     });

//     if (response.status === 202) {
//       throw new Error("Generation is still running, try again later.");
//     } else if (response.status === 200) {
//       return Buffer.from(response.data);
//     } else {
//       throw new Error(`Response ${response.status}: ${response.data.toString()}`);
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("An error occurred:", error.message);
//       throw new Error('Failed to fetch video');
//     } else {
//       console.error("An unexpected error occurred:", error);
//       throw new Error('Failed to fetch video');
//     }
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { fields, files } = await parseForm(request);

//     // Ensure `files` is of type `Files`
//     if (!files || typeof files !== 'object') {
//       throw new Error('Invalid files data.');
//     }

//     // Properly type `files.image`
//     const imageFiles = files.image as formidable.File | formidable.File[] | undefined;

//     if (!imageFiles) {
//       throw new Error('No image file found in the request.');
//     }

//     // Handle single file or array of files
//     const imagePath = Array.isArray(imageFiles)
//       ? imageFiles[0]?.filepath
//       : imageFiles?.filepath;

//     if (!imagePath) {
//       throw new Error('No valid file path found.');
//     }

//     const generationID = await generateVideo(imagePath);
//     return NextResponse.json({ message: 'Video generation started', generationID });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
//     }
//   }
// }

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const generationID = url.searchParams.get('generationID');

//   if (!generationID) {
//     return NextResponse.json({ error: 'Missing generationID parameter' }, { status: 400 });
//   }

//   try {
//     const videoBuffer = await fetchVideo(generationID);
//     return new NextResponse(videoBuffer, {
//       headers: {
//         'Content-Type': 'video/mp4'
//         'Content-Disposition': 'attachment; filename="video.mp4"',
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     } else {
//       return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
//     }
//   }
// }
