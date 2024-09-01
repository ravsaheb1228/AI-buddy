import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        // Input parameters for video generation
        const input = {
            prompt_b: prompt, // Adjust this based on the video model's input format
        };

        // Replace the model ID with the one for video generation
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", // Replace with the actual model and version ID
            { input }
        );
        console.log(response);

        return NextResponse.json(response);

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
