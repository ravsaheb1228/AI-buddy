import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = ({ pdfText }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [messages, setMessages] = useState([]); // Array to store questions and responses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling to the end of messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Add user question to messages
    const newMessage = { text: userQuestion, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const answer = await fetchResponseFromAPI(userQuestion, pdfText);
      // Add AI response to messages
      const responseMessage = { text: answer, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    } catch (err) {
      setError('Error fetching the answer. Please try again.');
    } finally {
      setLoading(false);
      setUserQuestion('');
    }
  };

  const fetchResponseFromAPI = async (question, pdfContent) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pdfText: pdfContent, question }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.output; // Assuming the response has an 'output' field
  };

  // Scroll to the bottom of the messages whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      height: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'scroll', // Allow vertical scrolling
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px', // Space between messages
      // Hide scrollbar styles
      scrollbarWidth: 'none', // For Firefox
      msOverflowStyle: 'none', // For Internet Explorer and Edge
    },
    // Webkit-based scrollbar styles for Chrome and Safari
    messagesContainerWebkit: {
      '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar
      },
    },
    message: {
      padding: '10px',
      borderRadius: '20px',
      maxWidth: '75%', // Limit max width of messages
      wordWrap: 'break-word',
    },
    userMessage: {
      backgroundColor: '#dcf8c6',
      alignSelf: 'flex-end',
      marginLeft: 'auto', // Align user messages to the right
    },
    aiMessage: {
      backgroundColor: '#f1f1f1',
      alignSelf: 'flex-start',
      marginRight: 'auto', // Align AI messages to the left
    },
    form: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginRight: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: 'white',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    error: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '4px',
      backgroundColor: '#ffe0e0',
      color: '#d32f2f',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PDF Chat Interface</h1>
      {/* Messages display area */}
      <div style={{ ...styles.messagesContainer, ...styles.messagesContainerWebkit }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(message.sender === 'user' ? styles.userMessage : styles.aiMessage),
            }}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This div will help in scrolling */}
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask a question about the PDF..."
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={styles.button}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default ChatInterface;
