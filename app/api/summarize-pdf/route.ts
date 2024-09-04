// app/api/summarize-pdf/route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { Readable } from 'stream';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    // Convert the Request body to a stream
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'uploads'),
      keepExtensions: true,
    });

    const stream = Readable.from(await request.arrayBuffer());

    // Parse the form from the stream
    const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
      form.parse(stream, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    if (!files.file || !Array.isArray(files.file) || !files.file[0].filepath) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = files.file[0].filepath;
    const pdfBytes = fs.readFileSync(filePath);

    // Extract text from the PDF
    const data = await pdf(pdfBytes);
    const fullText = data.text;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const summaryPrompt = `${fields.prompt || 'Summarize this document'}\n\n${fullText}`;
    const result = await model.generateContent(summaryPrompt);
    const summary = result.response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error summarizing PDF:', error);
    return NextResponse.json({ error: 'Failed to summarize PDF' }, { status: 500 });
  }
}
