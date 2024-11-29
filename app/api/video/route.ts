import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN2
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt } = body;

        // Validate that the prompt exists
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const input = {
            prompt_b: prompt
        };

        // Generate audio using the Replicate model
        const response = await replicate.run(
            "cjwbw/damo-text-to-video:1e205ea73084bd17a0a3b43396e49ba0d6bc2e754e9283b2df49fad2dcf95755",
            { input }
        );
        console.log(response);

        // Return the generated response as JSON
        return NextResponse.json(response);

    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
