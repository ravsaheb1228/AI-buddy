import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import { ReadStream } from 'fs';

const STABILITY_API_KEY = process.env.STABILITY_API_KEY_V;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = await parseFormData(req);
      const response = await initiateGeneration(data);
      res.status(200).json({ generationId: response.data.id });
    } catch (error) {
      res.status(500).json({ error: 'Error initiating generation' });
    }
  } else if (req.method === 'GET') {
    const { generationId } = req.query;
    if (!generationId) {
      return res.status(400).json({ error: 'Generation ID is required' });
    }
    try {
      const response = await checkGenerationStatus(generationId as string);
      if (response.status === 202) {
        res.status(202).json({ message: 'Generation is still running' });
      } else if (response.status === 200) {
        const filePath = path.join(process.cwd(), 'public', 'generated', `${generationId}.mp4`);
        fs.writeFileSync(filePath, Buffer.from(response.data));
        res.status(200).json({ message: 'Generation complete', videoUrl: `/generated/${generationId}.mp4` });
      } else {
        res.status(response.status).json({ error: 'Unexpected response from Stability API' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error checking generation status' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function parseFormData(req: NextApiRequest): Promise<{ [key: string]: any }> {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      // Only return the first file if multiple are uploaded
      const image = Array.isArray(files.image) ? files.image[0] : files.image;
      resolve({ ...fields, image });
    });
  });
}

async function initiateGeneration(data: { [key: string]: any }) {
  const formData = new FormData();
  formData.append('text_prompt', data.text_prompt as string);

  if (data.image) {
    const file = data.image as formidable.File;
    const stream = fs.createReadStream(file.filepath) as ReadStream;
    formData.append('image', stream, file.originalFilename || '');
  }

  formData.append('seed', data.seed as string || '0');
  formData.append('cfg_scale', data.cfg_scale as string || '1.8');
  formData.append('motion_bucket_id', data.motion_bucket_id as string || '127');

  return axios.post('https://api.stability.ai/v2beta/generation/text-to-video', formData, {
    headers: {
      'Authorization': `Bearer ${STABILITY_API_KEY}`,
      ...formData.getHeaders(),
    },
  });
}

async function checkGenerationStatus(generationId: string) {
  return axios.get(`https://api.stability.ai/v2beta/generation/text-to-video/result/${generationId}`, {
    validateStatus: undefined,
    responseType: 'arraybuffer',
    headers: {
      'Authorization': `Bearer ${STABILITY_API_KEY}`,
      'Accept': 'video/*',
    },
  });
}