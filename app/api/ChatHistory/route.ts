import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/config/dbConfig';
import User from '@/lib/models/auth';

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, prompt, response } = await request.json();

        // Check if email, prompt, or response are missing
        if (!email || !prompt || !response) {
            return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
        }

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            // Ensure `chats` is initialized
            if (!user.chats) {
                user.chats = [];
            }

            // Add new prompt and response to the user's existing chats array
            user.chats.push({ prompt, response });
        } else {
            // If user doesn't exist, create a new one
            user = new User({
                email,
                chats: [{ prompt, response }],
            });
        }

        // Save the user document
        await user.save();

        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error saving data:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ success: false, message: 'Error saving data', error: errorMessage }, { status: 500 });
    }
}
