import { Mic } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const SpeechRecognitionComponent: React.FC = () => {
    const [recognitionActive, setRecognitionActive] = useState(false);
    const [prompt, setPrompt] = useState('');

    // Voice recognition setup with a support check
    const SpeechRecognition = 
        (window as any).SpeechRecognition || 
        (window as any).webkitSpeechRecognition;
    let recognition: any;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
    } else {
        console.warn('Speech Recognition API is not supported in this browser.');
    }

    useEffect(() => {
        if (!recognition) return;

        recognition.onstart = () => {
            console.log('Voice recognition started.');
            setRecognitionActive(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            console.log(`Recognized speech: ${transcript}`);
            setPrompt(transcript);
        };

        recognition.onspeechend = () => {
            console.log('Voice recognition ended.');
            setRecognitionActive(false);
            document.dispatchEvent(new CustomEvent('autoSearch', { detail: { prompt } }));
        };

        recognition.onerror = (event: any) => {
            console.error('Recognition error:', event.error);
            setRecognitionActive(false);
        };

        // Cleanup function to stop recognition if the component unmounts
        return () => {
            if (recognitionActive) {
                recognition.stop();
            }
        };
    }, [recognitionActive, recognition]);

    const startVoiceSearch = () => {
        if (recognition && !recognitionActive) {
            recognition.start();
        } else if (!recognition) {
            alert('Speech Recognition is not supported in your browser.');
        }
    };

    return (
        <div>
            <Mic 
                onClick={startVoiceSearch}
                className="text-white p-2 rounded-full items-center justify-center cursor-pointer hover:bg-gray-900 transition-transform transform hover:scale-105 h-full w-full"
            />
            <p>{prompt}</p>
        </div>
    );
};

export default SpeechRecognitionComponent;
