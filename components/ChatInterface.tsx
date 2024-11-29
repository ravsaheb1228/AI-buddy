// File: components/ChatInterface.tsx
'use client'
import React, { useState } from 'react';

interface ChatInterfaceProps {
  pdfText: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ pdfText }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: input }]);
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pdfText, question: input }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        setMessages(prev => [...prev, { type: 'bot', content: data.output }]);
      } catch (error) {
        console.error('Error chatting:', error);
        setMessages(prev => [...prev, { type: 'bot', content: 'Sorry, I encountered an error while processing your request.' }]);
      } finally {
        setIsLoading(false);
        setInput('');
      }
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about the PDF..."
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;