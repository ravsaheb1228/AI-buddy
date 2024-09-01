import { NextRequest, NextResponse } from 'next/server';
import FormData from 'form-data';
import axios from 'axios';
import { Buffer } from 'node:buffer';

export async function POST(req: NextRequest) {
  try {
    const { prompt, output_format = 'webp' } = await req.json();

    // Prepare form data
    const form = new FormData();
    form.append('prompt', prompt);
    form.append('output_format', output_format);

    // Make API request
    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, // Replace with your API key
          Accept: 'image/*',
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert response data to base64
    const imageBase64 = Buffer.from(response.data).toString('base64');
    const imageDataUrl = `data:image/${output_format};base64,${imageBase64}`;

    // Respond with base64 image data
    return NextResponse.json({
      message: 'Image generated successfully',
      image: imageDataUrl,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while generating the image' }, { status: 500 });
  }
}
