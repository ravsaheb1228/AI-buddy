'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Instagram, Facebook, Github, Linkedin } from 'lucide-react';
import ImageSlider from '@/components/ImageSlider'; // Import the carousel component
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col">
            {/* Header */}
            <header className="flex items-center p-6 bg-white shadow-lg fixed w-full z-50">
                <motion.div
                    className="relative w-16 h-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                </motion.div>
                
                <div className="flex ml-auto space-x-6">
                    <Link href="/signin">
                        <Button className="text-base border border-blue-600 text-white hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full transition duration-300">
                            Login
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="text-base border border-blue-600 text-white hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full transition duration-300">
                            Register
                        </Button>
                    </Link>
                </div>
            </header> 

            {/* Main Content */}
            <main className="flex-grow flex flex-col md:flex-row justify-center items-center pt-24 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100"></div>
                <div className="flex flex-col md:flex-row items-center justify-center z-10 p-6 md:p-12">
                    
                    {/* Text and Buttons */}
                    <motion.div
                        className="text-center text-gray-900 w-full md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-pulse bg-clip-text text-transparent">
                            Welcome to AI Buddy
                        </h1>
                        <p className="text-lg md:text-xl font-light mb-8">
                            Explore the future of AI with tools for Chat, Code Generation, Image Creation, Video Making, and Audio Production. Unleash creativity like never before!
                        </p>
                        <div className="mt-6 flex flex-row space-x-4 justify-center">
                            <Link href={"/"}>
                                <Button className="text-lg bg-blue-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform duration-300">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/learn-more">
                                <Button className="text-lg bg-gray-200 text-gray-800 px-8 py-3 rounded-full shadow-md hover:bg-gray-300 transition-transform duration-300">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* ImageSlider */}
                    <motion.div
                        className="relative w-full md:w-1/2 mt-10 md:mt-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ImageSlider />
                    </motion.div>
                </div>
            </main>

            {/* Introduction Section */}
            <section className="bg-white py-16 px-6">
                <motion.h2
                    className="text-4xl font-bold text-center text-gray-800 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Explore Our Models
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Conversation AI",
                            description: "Engage in natural, intelligent conversations with our advanced chat models, designed to understand and respond to a wide range of queries.",
                            link: "/conversation-demo",
                            gradient: "bg-gradient-to-r from-blue-400 to-indigo-500",
                        },
                        {
                            title: "Code Generation",
                            description: "Generate code snippets quickly and accurately in various programming languages with our code generation tool, ideal for speeding up development.",
                            link: "/code-demo",
                            gradient: "bg-gradient-to-r from-green-400 to-teal-500",
                        },
                        {
                            title: "Video Summary",
                            description: "Create concise and informative summaries of your videos, helping you extract key points and essential information effortlessly.",
                            link: "/video-summary-demo",
                            gradient: "bg-gradient-to-r from-yellow-400 to-orange-500",
                        },
                        {
                            title: "Text to Image",
                            description: "Transform textual descriptions into vivid images using our text-to-image generator, perfect for creating visuals from ideas.",
                            link: "/text-to-image-demo",
                            gradient: "bg-gradient-to-r from-pink-400 to-red-500",
                        },
                        {
                            title: "Text to Video",
                            description: "Convert text into engaging videos, allowing you to create multimedia content from written input with ease.",
                            link: "/text-to-video-demo",
                            gradient: "bg-gradient-to-r from-purple-400 to-blue-500",
                        },
                        {
                            title: "Text to Audio",
                            description: "Generate natural-sounding audio from text, providing an effective way to create spoken content from written material.",
                            link: "/text-to-audio-demo",
                            gradient: "bg-gradient-to-r from-teal-400 to-blue-500",
                        },
                        {
                            title: "PDF Summary",
                            description: "Extract and summarize key information from PDFs, making it easier to review and analyze large documents.",
                            link: "/pdf-summary-demo",
                            gradient: "bg-gradient-to-r from-gray-400 to-gray-600",
                        }
                    ].map((model, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div
                                className={`absolute inset-0 ${model.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                            ></div>
                            <div className="p-6 z-10 relative">
                                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-300">
                                    {model.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-200 mt-4">
                                    {model.description}
                                </p>
                                <Link href={model.link}>
                                    <Button className={`mt-6 ${model.gradient.replace('bg-gradient-to-r', 'bg')} text-white px-4 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-colors duration-300`}>
                                        Try Now
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

                        {/* Footer */}
                        <footer className="bg-gray-900 text-white py-8">
                <section className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">
                                AI Buddy
                            </h6>
                            <p className="text-sm text-gray-400">
                                Your gateway to the future of artificial intelligence. Explore our suite of AI tools designed to enhance your creativity and productivity.
                            </p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Tools</h6>
                            <p><a className="text-gray-400 hover:text-white">Chat</a></p>
                            <p><a className="text-gray-400 hover:text-white">Code Generation</a></p>
                            <p><a className="text-gray-400 hover:text-white">Image Creation</a></p>
                            <p><a className="text-gray-400 hover:text-white">Video Making</a></p>
                            <p><a className="text-gray-400 hover:text-white">Audio Production</a></p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Resources</h6>
                            <p><a className="text-gray-400 hover:text-white">Documentation</a></p>
                            <p><a className="text-gray-400 hover:text-white">API Reference</a></p>
                            <p><a className="text-gray-400 hover:text-white">Community</a></p>
                            <p><a className="text-gray-400 hover:text-white">Support</a></p>
                        </div>
                        <div className="mt-3">
                            <h6 className="text-uppercase mb-4 font-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                            <p><i className="fas fa-phone mr-3"></i> + 01 234 567 89</p>
                        </div>
                    </div>
                </section>

                <div className="bg-gray-800 py-4">
                    <div className="container mx-auto flex justify-center items-center space-x-4">
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Instagram size={24} />
                        </a>
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Facebook size={24} />
                        </a>
                        <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Github size={24} />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
