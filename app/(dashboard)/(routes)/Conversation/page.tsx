'use client';

import { useState, useEffect } from "react";
import { CircleEllipsis, MessageSquare, Search, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpeechRecognitionComponent from "@/components/speechrecognition";
import { UserAvatar } from "@/components/user-avatar";
import { Heading } from "@/components/heading";
import { useSession } from "next-auth/react";
import ChatHistory from "@/components/ChatHistory";

interface ResponseEntry {
    question: string;
    answer: string;
}

interface ConversationEntry {
    role: 'user' | 'assistant';
    content: string;
}

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [responses, setResponses] = useState<ResponseEntry[]>([]);
    const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [speechActive, setSpeechActive] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const { data: session } = useSession();
    const [currentPrompt, setCurrentPrompt] = useState('');
    const [currentResponse, setCurrentResponse] = useState('');

    const handleChatSelect = (prompt: string, response: string) => {
        setCurrentPrompt(prompt);
        setCurrentResponse(response);
        setConversationHistory([
            { role: 'user', content: prompt },
            { role: 'assistant', content: response }
        ]);
    };

    
    const generateText = async () => {
        if (prompt.trim() === '') return;

        setLoading(true);
        try {
            const newConversationHistory: ConversationEntry[] = [
                ...conversationHistory,
                { role: 'user', content: prompt }
            ];

            const response = await fetch('/api/conversation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    body: prompt,
                    conversationHistory: newConversationHistory
                })
            });

            const data = await response.json();
            const formattedResponse = formatResponse(response.ok ? data.output : data.error);

            const email = session?.user?.email ?? 'unknown@example.com';

            await fetch('/api/ChatHistory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    prompt,
                    response: formattedResponse,
                })
            });

            setResponses(prevResponses => [
                { question: prompt, answer: formattedResponse },
                ...prevResponses
            ]);

            setConversationHistory([
                ...newConversationHistory,
                { role: 'assistant', content: formattedResponse }
            ]);

            setPrompt('');
        } catch (error) {
            console.error(error);
            setResponses(prevResponses => [
                { question: prompt, answer: formatResponse('An error occurred.') },
                ...prevResponses
            ]);
            setPrompt('');
        }
        setLoading(false);
    };

    const extractTextFromHtml = (html: string): string => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };

    const formatResponse = (text: string): string => {
        const sections = text.split('\n').filter(section => section.trim() !== '');
        let formattedText = '';

        sections.forEach(section => {
            section = section.replace(/\*\*(.*?)\*\*/g, '<span style="font-weight: bold;">$1</span>');

            if (section.startsWith('**')) {
                formattedText += `<h2 style="color: #000000;">${section.replace(/^\*\*|\*\*$/g, '').trim()}</h2>`;
            } else if (section.startsWith('*')) {
                formattedText += `<ul style="color: #000000;"><li>${section.replace(/^\* /, '').trim()}</li></ul>`;
            } else {
                formattedText += `<p style="color: #000000;">${section}</p>`;
            }
        });

        return formattedText;
    };

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const cleanText = extractTextFromHtml(text);
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.voice = selectedVoice ?? null;
            utterance.onstart = () => setSpeechActive(true);
            utterance.onend = () => setSpeechActive(false);
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Speech Synthesis not supported.');
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && prompt.trim() !== '') generateText();
    };

    const stopSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setSpeechActive(false);
        }
    };

    const toggleSpeech = () => {
        if (speechActive) {
            stopSpeech();
        } else {
            if (responses.length > 0) {
                const latestResponse = responses[0].answer;
                speakText(latestResponse);
            }
        }
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('autoSearch', generateText);
        };
    }, [prompt]);

    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        updateVoices();
        window.speechSynthesis.onvoiceschanged = updateVoices;
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center py-5">
            <div className="flex flex-col p-4 lg:p-8 w-full h-full relative mt-12 mx-auto">
                <form onSubmit={(e) => { e.preventDefault(); generateText(); }} className="bg-gray-800 border border-gray-700 rounded-full p-4 sticky top-16 z-10 flex space-x-2 w-full lg:p-3">
                    <Button
                        type="submit"
                        className="text-white p-2 rounded-full hover:bg-cyan-600 transition-transform transform hover:scale-105"
                    >
                        <Search />
                    </Button>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your question here"
                        className="flex-grow px-4 bg-transparent border-0 rounded outline-none text-white placeholder-gray-400 focus-visible:ring-0"
                    />
                    <SpeechRecognitionComponent />
                </form>
                <div className="mt-4 flex-grow overflow-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-white font-roboto mt-56">
                            <CircleEllipsis className="animate-spin text-purple-500" size={48} />
                            <p className="ml-4">Master is thinking...</p>
                        </div>
                    ) : responses.length === 0 ? (
                        <div>
                            <div className="p-6 w-full max-w-2xl mx-auto mt-24 flex items-center justify-center shadow-md border rounded-md text-white">
                                <Heading
                                    title={"Conversation"}
                                    description={"Summarize any YouTube video quickly with our cutting-edge summarization tool."}
                                    icon={MessageSquare}
                                    iconColor={"text-cyan-200"}
                                    bgColor={"bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400"}
                                />
                            </div>
                            <div className="w-full">
                                <ChatHistory onChatSelect={handleChatSelect} />
                            </div>
                            <div className="w-full">
                                {/* Your existing chat interface */}
                                <div>
                                    <p>{currentPrompt}</p>
                                </div>
                                <div>
                                    <p>{currentResponse}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="font-montserrat space-y-4 p-8 w-full flex flex-col gap-x-8">
                            {responses.map((response, index) => (
                                <div key={index} className="p-4">
                                    <div className="flex space-x-3 justify-end">
                                        <div className="flex space-x-3 bg-violet-300 overflow-auto my-2 p-2 rounded-lg justify-end">
                                            <p className="text-lg text-black">{response.question}</p>
                                        </div>
                                        <div className="pt-3">
                                            <UserAvatar />
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <img src="/logo.png" alt="bot-avatar" className="w-7 h-7 mt-3" />
                                        <div className="flex space-x-3 bg-violet-300 overflow-auto my-2 p-2 rounded-lg justify-start">
                                            <p dangerouslySetInnerHTML={{ __html: response.answer }} className="text-black"></p>
                                            <Button
                                                onClick={toggleSpeech}
                                                className="text-white p-2 rounded-full hover:bg-cyan-600 transition-transform transform hover:scale-105"
                                            >
                                                {speechActive ? <VolumeX /> : <Volume2 />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
