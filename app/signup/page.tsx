"use client";

// Importing necessary components and libraries
import { Mail, Lock, User } from "lucide-react"; // Importing icons
import Image from "next/image"; // Next.js optimized image component
import React, { useState } from "react"; // React hooks
import bg from "../../public/bg-2.png"; // Background image
import logo from "../../public/logo.png"; // Logo image
import google from "../../public/google2.svg"; // Google logo image for sign-in
import axios from "axios"; // Axios for making HTTP requests
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { signIn } from "next-auth/react"; // NextAuth.js for authentication

// Signup component
const Signup = () => {
  // State to manage loading, error, and user form data
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Using Next.js router
  const [error, setError] = useState(""); // Error state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to handle input changes and update the state
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevents default form submission behavior
    setLoading(true); // Set loading state to true
    console.log(user); // Log the current user state (for debugging)

    try {
      // Check if all fields are filled
      if (!user.name || !user.email || !user.password) {
        setError("Please fill all the fields"); // Display error if fields are empty
        return;
      }

      // Email validation
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("Invalid email ID"); // Display error if email is invalid
        return;
      }

      // Sending registration data to the API
      const res = await axios.post("/api/register", user);
      console.log(res.data); // Log response from server

      // If registration is successful, redirect to the sign-in page
      if (res.status == 200 || res.status == 201) {
        console.log("User added successfully");
        setError(""); // Clear error
        router.push("/dashboard"); // Redirect to sign-in page
      }
    } catch (error) {
      console.log(error); // Log any errors
      setError(""); // Clear error
    } finally {
      // Reset loading state and form fields
      setLoading(false);
      setUser({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  // JSX for rendering the signup page
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url("/background.png")`, // Background image for the entire screen
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="grid place-items-center mx-auto max-w-4xl w-full py-10 min-h-screen">
        <div className="flex justify-center items-center lg:flex-row flex-col gap-6 lg:gap-0 w-full shadow-md rounded-2xl">
          <div className="lg:w-1/2 w-full bg-[#5D7DF3]">
            <Image
              src={bg}
              alt="bg"
              className="w-full h-full"
              width={300}
              height={300}
            />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center py-6 bg-[#eff1f6]">
            <div className="rounded px-4 py-2 shadow bg-[#90a5ef]">
              <Image src={logo} alt="bg" width={100} height={100} /> {/* Logo */}
            </div>

            {/* Signup form */}
            <form
              className="w-full px-5 py-6 space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Fullname</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <User className="w-7 h-7 text-[#A1BDFD]" /> {/* User icon */}
                  <input
                    type={"text"}
                    placeholder="John Doe"
                    name="name"
                    className="outline-none w-full px-4"
                    value={user.name} // Controlled input
                    onChange={handleInputChange} // Handle input changes
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Email</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <Mail className="w-7 h-7 text-[#A1BDFD]" /> {/* Mail icon */}
                  <input
                    type={"email"}
                    placeholder="example@123.com"
                    name="email"
                    className="outline-none w-full px-4"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:px-5">
                <label className="text-sm">Password</label>
                <div className="bg-white flex justify-start items-start py-3 px-4 rounded text-slate-600 text-lg mt-1">
                  <Lock className="w-7 h-7 text-[#A1BDFD]" /> {/* Lock icon */}
                  <input
                    type={"password"}
                    placeholder="**********"
                    name="password"
                    className="outline-none w-full px-4"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Display error message */}
                <div className="grid place-items-center w-full mx-auto pt-7">
                  {error && <p className="py-6 text-lg">{error}</p>}
                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    className="bg-[#5D7DF3] text-white text-lg w-full px-8 py-3 rounded-md uppercase font-semibold"
                  >
                    {loading ? "Processing" : "Register"} {/* Loading state */}
                  </button>
                </div>

                {/* Separator */}
                <div className="flex justify-center w-full items-center gap-3 py-3">
                  <div className="border-b border-gray-800 py-2 w-full px-6" />
                  <div className="mt-3">or</div>
                  <div className="border-b border-gray-800 py-2 w-full px-6" />
                </div>

                {/* Google Sign-in button */}
                <div onClick={() => signIn("google")} className="rounded px-6 py-2 shadow cursor-pointer bg-gray-50 grid place-items-center mx-auto mb-8">
                  <Image src={google} alt="bg" width={100} height={100} />
                </div>

                {/* Link to login */}
                <div className="text-lg text-slate-900 font-medium">
                  <span>Have an account?</span>
                  <a href="/signin" className="text-[#5D7DF3] pl-3 hover:underline">
                    Login
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
