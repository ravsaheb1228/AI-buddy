import { connect } from "@/lib/config/dbConfig"; // Import the database connection function
import User from "@/lib/models/auth"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing
import { NextResponse, NextRequest } from "next/server"; // Import types for Next.js API route

// Establish a connection to the MongoDB database
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get user details
    const { name, email, password, chats } = await request.json();

    // Check if a user with the given email already exists
    const user = await User.findOne({ email });

    if (user) {
      // If the user exists, return an error response
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 } // HTTP status code for Bad Request
      );
    }

    // Generate a salt for hashing the password
    const salt = await bcryptjs.genSalt(10);
    // Hash the password with the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      chats,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return a success response with the saved user data
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // Handle any errors that occur and return an error response
    return NextResponse.json({ error: error.message }, { status: 500 }); // HTTP status code for Internal Server Error
  }
}
