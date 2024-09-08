import React from 'react';
import { MessageSquare, Star, ChevronRight } from 'lucide-react';

interface Chat {
  _id: string;
  title: string;
}

interface ChatSidebarProps {
  recentChats: Chat[];
  onChatSelect: (conversationId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ recentChats, onChatSelect }) => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Claude</h1>
      
      <button className="w-full bg-white text-gray-700 py-2 px-4 rounded-md mb-6 text-left hover:bg-gray-200">
        ⊕ Start new chat
      </button>
      
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 mb-2">Starred</h2>
        <p className="text-sm text-gray-500">Star chats you use often</p>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold text-gray-500 mb-2">Recents</h2>
        <ul>
          {recentChats.map((chat) => (
            <li 
              key={chat._id} 
              className="flex items-center mb-2 text-sm text-gray-700 hover:bg-gray-200 rounded p-1 cursor-pointer"
              onClick={() => onChatSelect(chat._id)}
            >
              <MessageSquare size={16} className="mr-2" />
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
      
      <button className="mt-4 text-sm text-gray-500 flex items-center hover:text-gray-700">
        View all <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default ChatSidebar;