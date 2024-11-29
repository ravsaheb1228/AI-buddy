// File: app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this import is correct
import { NextResponse } from "next/server"; // Ensure this import is correct

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro"
    });

    const { pdfText, question } = await req.json();

    if (!pdfText || !question) {
      return NextResponse.json({ error: 'PDF text and question are required' }, { status: 400 });
    }

    const prompt = `Based on the following PDF content, please answer the question.
    
PDF Content: ${pdfText}

Question: ${question}

Please provide a concise and relevant answer based on the PDF content.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output: output });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}
