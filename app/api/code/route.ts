import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        const model = genAI.getGenerativeModel({
            model: "gemini-pro"
        });

        const data = await req.json();
        const prompt = data.body;
        const isCodeGeneration = data.isCodeGeneration; // Expecting a flag in the request body

        // Check if the request is for code generation
        if (!isCodeGeneration) {
            return NextResponse.json({ error: "This endpoint is only for code generation requests." }, { status: 400 });
        }

        // Generate content using the AI model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();

        return NextResponse.json({ output: output });
    } catch (error) {
        console.error("Error generating code:", error);
        return NextResponse.json({ error: "An error occurred while generating code." }, { status: 500 });
    }
}
