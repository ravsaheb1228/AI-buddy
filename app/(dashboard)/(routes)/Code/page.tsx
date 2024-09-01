'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleEllipsis, Copy, Send } from "lucide-react";
import Notification from '@/components/Notification'; // Import the custom notification component
import { UserAvatar } from '@/components/user-avatar';

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [responses, setResponses] = useState<{ question: string; answer: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const generateText = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: prompt, isCodeGeneration: true }),
            });

            const data = await response.json();

            if (response.ok) {
                setResponses((prevResponses) => [{ question: prompt, answer: formatResponse(data.output) }, ...prevResponses]);
                setNotification({ message: 'Code generated successfully!', type: 'success' });
            } else {
                setResponses((prevResponses) => [{ question: prompt, answer: formatResponse(data.error) }, ...prevResponses]);
                setNotification({ message: 'Failed to generate code.', type: 'error' });
            }
            setPrompt('');
        } catch (error) {
            console.log(error);
            setResponses((prevResponses) => [{ question: prompt, answer: formatResponse('An error occurred.') }, ...prevResponses]);
            setNotification({ message: 'An error occurred.', type: 'error' });
            setPrompt('');
        }
        setLoading(false);
    };

    const formatResponse = (text: string): string => {
        const lines = text.split('\n');
        let formattedText = '';
        let insideCodeBlock = false;

        lines.forEach(line => {
            if (line.startsWith('```')) {
                insideCodeBlock = !insideCodeBlock;
                formattedText += insideCodeBlock ? '<pre><code>' : '</code></pre>';
            } else {
                const escapedLine = line
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                formattedText += insideCodeBlock ? `${escapedLine}\n` : `<p>${escapedLine}</p>`;
            }
        });

        return formattedText;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setNotification({ message: 'Copied to clipboard!', type: 'success' });
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                setNotification({ message: 'Failed to copy text.', type: 'error' });
            });
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && prompt.trim() !== '') generateText();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prompt]);

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center py-10">
            <div className="flex flex-col p-4 lg:p-8 w-full h-full relative">
                <div className="bg-gray-800 border border-gray-700 rounded-full p-4 sticky top-0 z-10 flex space-x-2 w-full lg:p-3">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your question here"
                        className="flex-grow px-4 bg-transparent border-0 rounded outline-none text-white placeholder-gray-400 focus-visible:ring-0"
                    />
                    <Button
                        onClick={generateText}
                        className="bg-purple-700 text-white p-2 rounded-full hover:bg-purple-600 transition-transform transform hover:scale-105"
                    >
                        <Send />
                    </Button>
                </div>
                <div className="mt-4 flex-grow overflow-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-white font-roboto">
                            <CircleEllipsis className="animate-spin text-purple-500" size={48} />
                            <p> Master is thinking...</p>
                        </div>
                    ) : responses.length === 0 ? (
                        <p className="text-center text-gray-400 mt-28 ">AI Buddy</p>
                    ) : (
                        <div className="font-montserrat space-y-4 p-8 w-full flex flex-col gap-x-8">
                            {responses.map((response, index) => (
                                <div key={index} className="relative p-4">
                                    <div className="flex space-x-3 justify-end">
                                        <div className="flex space-x-3 bg-black/5 overflow-auto my-2 p-2 rounded-lg justify-end">
                                            <p className="text-lg text-left text-white">{response.question}</p>
                                        </div>
                                        <div className="pt-3">
                                            <UserAvatar />
                                        </div>
                                    </div>
                                    <div className="relative flex space-x-3">
                                        <img src="/logo.png" alt="bot-avatar" className="w-7 h-7 mt-3" />
                                        <div className="flex space-x-3 bg-purple-700/40 overflow-auto my-2 p-2 rounded-lg justify-start">
                                            <p dangerouslySetInnerHTML={{ __html: response.answer }} className="vs-code-style text-white"></p>
                                        </div>
                                        <button
                                        onClick={() => copyToClipboard(response.answer)}
                                        className="flex my-2 py-2 text-white hover:text-gray-300 items-start justify-start"
                                        >
                                            <Copy />
                                        </button>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={handleCloseNotification}
                />
            )}
        </div>
    );
}
