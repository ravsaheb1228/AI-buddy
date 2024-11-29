// File: pages/index.tsx

'use client'
// Import React's useState hook to manage state
import { useState } from 'react';
// Import custom components for uploading PDFs and the chat interface
import PDFUploader from '@/components/PDFUploader';
import ChatInterface from '@/components/PDFInterface';

export default function Home() {
  // State to hold the extracted text from the uploaded PDF
  const [pdfText, setPdfText] = useState<string>('');

  // Function to handle the uploaded PDF and store the extracted text
  const handlePDFUpload = (text: string) => {
    setPdfText(text);
  };

  return (
    // Main container that fills the entire screen, centers content, and uses a background gradient
    <div className=" mt-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen flex flex-col items-center justify-center">
      {/* Card container with white background, rounded corners, and hover scaling effect */}
      <div className="bg-slate-700 shadow-xl rounded-lg mt-16 w-full max-w-2xl p-6">
        {/* Title with gradient text effect and large font */}
        <h1 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-white font-lora mb-8">
          Let your documents talk back to you!
        </h1>
        {/* PDF Uploader component centered in the container */}
        <div className="flex justify-center mb-6 ">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-md border border-indigo-300 ">
            <PDFUploader onUpload={handlePDFUpload} />
          </div>
        </div>
        {/* Conditionally rendering the ChatInterface if a PDF is uploaded, otherwise showing a prompt */}
        <div className="p-4 border rounded-lg">
          {pdfText ? (
            <div className="mt-8">
              <ChatInterface pdfText={pdfText} />
            </div>
          ) : (
            // Placeholder text that encourages the user to upload a PDF, with a bounce animation
            <div className="text-center mt-8 text-gray-500 animate-bounce">
              Please upload a PDF to start interacting!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
