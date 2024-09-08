import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/lib/config/dbConfig';
import User from '@/lib/models/auth';

// Ensure the database is connected
connect();

export async function GET(request: NextRequest) {
    try {
        // Extract query parameters from the URL
        const { searchParams } = request.nextUrl;
        const email = searchParams.get('email');

        // Check if the email is provided
        if (!email) {
            return NextResponse.json({ success: false, message: 'Email parameter is required' }, { status: 400 });
        }

        // Find user by email and fetch their chats
        const user = await User.findOne({ email }).select('chats').exec();

        // If user is not found, return 404 error
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // If user is found, return their chat history
        return NextResponse.json({ success: true, data: user.chats }, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);

        // Handling unknown errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ success: false, message: 'Error fetching data', error: errorMessage }, { status: 500 });
    }
}
