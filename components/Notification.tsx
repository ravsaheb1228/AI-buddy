// Notification.tsx
import React, { useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        // Automatically hide the notification after 3 seconds
        const timer = setTimeout(() => onClose(), 1000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed items-center bottom-4 p-4 rounded-lg shadow-lg text-black ${type === 'success' ? 'bg-white' : 'bg-red-500'}`}
        >
            {message}
            <button
                onClick={onClose}
                className="ml-4 text-black text-lg"
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    );
};

export default Notification;
