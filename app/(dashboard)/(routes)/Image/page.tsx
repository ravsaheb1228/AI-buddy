'use client';
import { useState, useCallback } from "react";
import { CircleEllipsis, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

interface ApiError {
  error: string;
  details?: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [savedPrompt, setSavedPrompt] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const generateImage = useCallback(async () => {
    if (prompt.trim() === '') return;

    setLoading(true);
    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! Status: ${response.status}`);
        }
        setGeneratedImage(data.image);
        setSavedPrompt(prompt); // Save the prompt before clearing
        setPrompt(''); // Clear the input field
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error(`Received non-JSON response: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      let errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Failed to generate image: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && prompt.trim() !== '') {
      generateImage();
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center py-5 font-roboto">
      <div className="w-full max-w-3xl px-4">
        <div className="bg-gray-800 border border-gray-700 rounded-full p-4 flex space-x-2 mb-8">
          <Button
            onClick={generateImage}
            className="text-white p-2 rounded-full hover:bg-cyan-600 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            <Search />
          </Button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your image prompt here"
            className="flex-grow px-4 bg-transparent border-0 rounded outline-none text-white placeholder-gray-400 focus-visible:ring-0"
            disabled={loading}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-white">
            <CircleEllipsis className="animate-spin text-purple-500 mr-3" size={48} />
            <p>Generating image...</p>
          </div>
        ) : generatedImage ? (
          <div>
            <div className="flex flex-col items-end">
              <div className="pt-3">
                <UserAvatar />
              </div>
              <div className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-roboto mt-4">
                <p>{savedPrompt}</p>
              </div>
            </div>
            <img src="/logo.png" alt="bot-avatar" className="w-7 h-7 mt-3" />
            <div className="relative bg-gray-700 text-white px-4 py-2 rounded-md mt-4 inline-block">
              <div className="relative group w-1/2">
                <img 
                  src={generatedImage} 
                  alt="Generated Image" 
                  className="w-full h-auto object-contain rounded-md shadow-md my-4"
                />
                <button 
                  onClick={downloadImage} 
                  className="absolute top-2 right-2 text-white hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download size={24} />
                </button>
              </div>
              <p className="mt-4 font-lora">This is the result of the prompt you provided. {savedPrompt}.</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 font-lora text-3xl wavy-text">Every great image starts with a simple idea. Let your imagination guide you!</p>
        )}
      </div>
    </div>
  );
}
