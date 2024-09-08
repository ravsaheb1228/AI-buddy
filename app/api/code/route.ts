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
        const isCodeGeneration = data.isCodeGeneration; // Flag to identify code generation
        const isExplanation = data.isExplanation; // Flag to identify explanation request

        // Check if neither code generation nor explanation is requested
        if (!isCodeGeneration && !isExplanation) {
            return NextResponse.json({ error: "Specify either code generation or explanation in the request." }, { status: 400 });
        }

        let output = "";

        // Handle code generation request
        if (isCodeGeneration) {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            output = await response.text();
        }

        // Handle code explanation request
        if (isExplanation) {
            const explanationPrompt = `Explain this code briefly: ${prompt}`;
            const result = await model.generateContent(explanationPrompt);
            const response = await result.response;
            output = await response.text();
        }

        return NextResponse.json({ output });
    } catch (error) {
        console.error("Error generating code or explanation:", error);
        return NextResponse.json({ error: "An error occurred while processing the request." }, { status: 500 });
    }
}
