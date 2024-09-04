'use client';

import { useState } from 'react';

export default function Summarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', 'Summarize the PDF document');

    try {
      const response = await fetch('/api/summarize-pdf', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      alert(`Failed to summarize PDF: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">PDF Summarizer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize PDF'}
        </button>
      </form>
      {loading ? (
        <div className="flex justify-center items-center h-64 text-white">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              d="M12 4V1M12 4l-1 1M12 4l1 1M16.2 7.8l-1.4-1.4M16.2 7.8l-1.4 1.4M7.8 16.2l-1.4-1.4M7.8 16.2l-1.4 1.4M12 23v-3M12 23l-1-1M12 23l1-1"
            />
          </svg>
          <p>Generating summary...</p>
        </div>
      ) : (
        summary && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Summary:</h2>
            <p>{summary}</p>
          </div>
        )
      )}
    </div>
  );
}
