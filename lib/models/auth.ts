import mongoose from "mongoose";
import { randomUUID } from "crypto";
 // Import bcrypt for password hashing

// Chat Schema
const chatSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   default: () => randomUUID(), // Ensuring unique ID for chats
  // },
  prompt: {
    type: String,
    
  },
  response: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please write your full name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    // required: [true, "Password is required"],
    minlength: 6,
  },
  chats: [chatSchema], // Embedding chatSchema for chat history
});

// Model Creation
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
