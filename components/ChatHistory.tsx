// /component/ChatHistory
'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ChevronRight } from 'lucide-react';
import { UserAvatar } from './user-avatar';

type Chat = {
    id: string;
    prompt: string;
    response: string;
    timestamp: string;
};

interface CombinedChatHistoryProps {
    onChatSelect: (prompt: string, response: string) => void;
}

const CombinedChatHistory: React.FC<CombinedChatHistoryProps> = ({ onChatSelect }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { data: session } = useSession();
    const [chats, setChats] = useState<Chat[]>([]);
    const [showAllChats, setShowAllChats] = useState(false);

    const email = session?.user?.email;

    const fetchChatHistory = async () => {
        try {
            if (!email) {
                throw new Error('User email is not available');
            }
            const response = await fetch(`/api/getChatHistory?email=${email}`);
            const data = await response.json();

            if (data.success) {
                setChats(data.data);
            } else {
                setError(data.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
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

    useEffect(() => {
        if (email) {
            fetchChatHistory();
        }
    }, [email]);

    const handleChatClick = (chat: Chat) => {
        onChatSelect(chat.prompt, chat.response);
    };

    if (loading) return <p className="flex items-center justify-center text-slate-600">Loading chat history...</p>;
    if (error) return <p>Error: {error}</p>;

    const recentChats = chats.slice(0, 6);

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="flex flex-row w-full justify-between items-center">
                <h2 className="text-xl font-serif mb-2 text-white">Your recent chats</h2>
                <Button
                    onClick={() => setShowAllChats(!showAllChats)}
                    className="text-xl font-serif text-white bg-transparent"
                >
                    {showAllChats ? 'Hide chat history' : 'View all chats'}
                    <ChevronRight size={16} className="ml-2" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 ">
                {recentChats.map((chat) => (
                    <Card
                        key={chat.id}
                        className="text-white cursor-pointer hover:bg-gray-700 transition-shadow bg-gray-800 border-gray-700"
                        onClick={() => handleChatClick(chat)}
                    >
                        <CardHeader className="flex items-start space-x-2">
                            <MessageSquare size={18} />
                            <span className="font-semibold truncate">{chat.prompt.substring(0, 30) || 'New chat'}</span>
                        </CardHeader>
                        {/* <CardContent>
                            <p className="text-sm text-gray-500">{new Date(chat.timestamp).toLocaleDateString()}</p>
                        </CardContent> */}
                    </Card>
                ))}
            </div>

            {showAllChats && (
                <div className="mt-8">
                    <h2 className="text-xl font-serif mb-4 text-white">Full Chat History</h2>
                    {chats.map((chat, index) => (
                        <div
                            key={index}
                            className="mb-8 p-4 bg-gray-700 rounded-lg cursor-pointer "
                            onClick={() => handleChatClick(chat)}
                        >
                            <div className="flex space-x-3 justify-end">
                                <div className="flex space-x-3 bg-gray-600 overflow-auto my-2 p-2 rounded-lg justify-end">
                                    <p>{chat.prompt.substring(0, 100)}...</p>
                                </div>
                                <div className="pt-3">
                                    <UserAvatar />
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <img src="/logo.png" alt="bot-avatar" className="w-7 h-7 mt-3" />
                                <div className="flex space-x-3 bg-gray-600 overflow-auto my-2 p-2 rounded-lg justify-start">
                                    <p dangerouslySetInnerHTML={{ __html: formatResponse(chat.response.substring(0, 100)) }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CombinedChatHistory;