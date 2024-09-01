'use client';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { CircleEllipsis, Loader, ScrollText } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Home() {
  const [videoId, setVideoId] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseGenerated, setResponseGenerated] = useState(false);

  const extractVideoId = (urlOrId: string) => {
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = urlOrId.match(urlPattern);
    return match ? match[1] : urlOrId;
  };

  const generateTitle = (summary: string) => {
    const firstSentence = summary.split('. ')[0];
    return firstSentence.length > 50 ? firstSentence.slice(0, 50) + '...' : firstSentence;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummary('');
    setTitle('');
    setResponseGenerated(false);

    const extractedVideoId = extractVideoId(videoId);
    console.log('Submitting request for video ID:', extractedVideoId);

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_id: extractedVideoId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let summaryText = '';

      const processText = async ({ done, value }: { done: boolean; value?: Uint8Array }): Promise<void> => {
        if (done) {
          setLoading(false);
          setSummary(summaryText);
          setTitle(generateTitle(summaryText));
          setResponseGenerated(true);
          return;
        }

        summaryText += decoder.decode(value, { stream: true });
        setSummary(summaryText);
        await reader.read().then(processText);
      };

      await reader.read().then(processText);

    } catch (error) {
      console.error('Error:', error);
      setSummary('An error occurred while summarizing the video.');
      setTitle('');
      setLoading(false);
      setResponseGenerated(true);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center p-4">
      <div className="container mx-auto p-4 lg:p-8 w-full max-w-2xl flex flex-col items-center">
        
        {/* Centered Input Field */}
        <div className="w-full max-w-3xl px-4 mb-8 flex justify-center z-10 mt-10">
          <div className="bg-gray-800 border border-gray-700 rounded-full p-4 lg:p-3 flex items-center space-x-4 w-full">
            <form onSubmit={handleSubmit} className="w-full flex items-center justify-center">
              <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder="Enter YouTube Video ID or URL"
                className="flex-grow px-4 bg-transparent border-0 rounded outline-none text-white placeholder-gray-400 focus-visible:ring-0"
              />
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full hover:scale-105 transform transition-transform ml-4"
                disabled={loading}
              >
                {loading ?  <Loader className="animate-spin spin-out-180"></Loader> : 'Summarize'}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Embed the YouTube video and display response here */}
        <div className="mt-6 w-full flex flex-col items-center">
          {/* Embed the YouTube video */}
          {videoId && (
            <div className="flex flex-col w-full justify-center">
              <h3 className="text-xl font-semibold text-white mb-4">Watch the Video:</h3>
              <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ width: '100%', maxWidth: '320px', height: '180px' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          )}

          {/* Display the response */}
          <div className="mt-6 w-full flex flex-col items-center text-white">
            {/* Loading spinner */}

            {/* Summary content */}
            {summary && (
              <div className="p-6 rounded-lg shadow-md bg-gray-900 w-full max-w-2xl mt-4">
                <p className="text-white font-lora">{summary}</p>
              </div>
            )}

            {/* Placeholder text */}
            {!summary && (
              <div className="p-6 w-full max-w-2xl flex items-center justify-center shadow-md border rounded-md">
                <Heading
                  title={"YouTube Video Summarizer"}
                  description={"Summarize any YouTube video quickly with our cutting-edge summarization tool."}
                  icon={ScrollText}
                  iconColor={"text-cyan-200"}
                  bgColor={"bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
