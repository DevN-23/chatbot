import React from 'react';
import { Message } from '../types';

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory = ({ messages }: ChatHistoryProps) => {
  return (
    <div className="space-y-4 mb-4">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === 'bot' ? 'text-gray-700' : 'text-blue-600'}>
          <span className="font-semibold">{message.sender === 'bot' ? 'Bot' : 'You'}:</span> {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
