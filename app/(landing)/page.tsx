'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Instagram, Facebook, Github, Linkedin, X } from 'lucide-react';
import ImageSlider from '@/components/ImageSlider'; // Import the carousel component

const LandingPage = () => {

    return (
        <div className="bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center p-4 bg-gradient-to-br from-black via-gray-900 to-black shadow-lg">
                <div className="relative w-12 h-12 p-2 transform hover:scale-110 transition duration-500 ease-in-out">
                    <Image fill src={"/logo.png"} alt={"Logo"} className="rounded-full" />
                </div>
                <h1 className="text-4xl font-extrabold text-white font-Roboto ml-4 tracking-widest">
                    AI Buddy
                </h1>
                <div className="flex justify-items-end space-x-4 p-2 ml-auto">
                    <Link href="/sign-in">
                        <Button className="text-lg bg-blue-600 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-full">
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className="text-lg bg-blue-600 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-full">
                            Register
                        </Button>
                    </Link>
                </div>
            </header> 

            {/* Main Content */}
            <main className="flex-grow flex flex-col md:flex-row justify-center items-center relative h-full md:h-screen">
                <div className="absolute inset-0 bg-opacity-80 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient-x"></div>
                <div className="flex flex-col md:flex-row items-center justify-center z-10 p-4 md:p-8">
                    
                    {/* Text and Buttons */}
                    <div className="mt-8 text-center text-white  w-full md:w-1/2">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-Roboto bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-pulse bg-clip-text text-transparent">
                            Welcome to AI Buddy
                        </h1>
                        <p className="text-lg md:text-2xl font-montserrat mb-6">
                            Explore the future of AI with tools for Chat, Code Generation, Image Creation, Video Making, and Audio Production. Unleash creativity like never before!
                        </p>
                        <div className="mt-6 flex flex-row space-x-4 justify-center">
                            <Link href={"/"}>
                                <Button className="text-lg bg-indigo-600 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/learn-more">
                                <Button className="text-lg bg-gray-700 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* ImageSlider */}
                    <div className="relative w-full my-10 md:w-1/2 mb-10 md:mb-0 z-10">
                        <ImageSlider />
                    </div>
                </div>
            </main>



            {/* Footer */}
            <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-8">
                <section className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">
                                AI Buddy
                            </h6>
                            <p className="text-sm">
                                Your gateway to the future of artificial intelligence. Explore our suite of AI tools designed to enhance your creativity and productivity.
                            </p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Tools</h6>
                            <p><a className="text-white">Chat</a></p>
                            <p><a className="text-white">Code Generation</a></p>
                            <p><a className="text-white">Image Creation</a></p>
                            <p><a className="text-white">Video Making</a></p>
                            <p><a className="text-white">Audio Production</a></p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Resources</h6>
                            <p><a className="text-white">Documentation</a></p>
                            <p><a className="text-white">API Reference</a></p>
                            <p><a className="text-white">Community</a></p>
                            <p><a className="text-white">Support</a></p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@aibuddy.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +1 234 567 89</p>
                        </div>
                    </div>
                </section>
                <hr className="my-3 opacity-50"></hr>
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} AI Buddy. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="/privacy-policy">
                            <p className="text-gray-400 hover:text-white">Privacy Policy</p>
                        </Link>
                        <Link href="/terms-of-service">
                            <p className="text-gray-400 hover:text-white">Terms of Service</p>
                        </Link>
                        <div className="flex flex-row items-center justify-end space-x-4">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300">
                                <Instagram />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
                                <Facebook />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
                                <X />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition duration-300">
                                <Github />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition duration-300">
                                <Linkedin />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
