import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ChatHistory from './ChatHistory';
import PromptSuggestions from './PromptSuggestions';
import { Message } from '../types';

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const { authState } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      axios.post('/api/session/start', { userId: authState?.idToken?.sub })
        .then(response => {
          setSessionId(response.data.sessionId);
        });
    }
  }, [authState]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      axios.post('/api/chat', { sessionId, message: input })
        .then(response => {
          const botReply: Message = { text: response.data.reply, sender: 'bot' };
          setMessages([...messages, newMessage, botReply]);
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md bg-white">
      <ChatHistory messages={messages} />
      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded"
        />
        <button onClick={handleSendMessage} className="p-2 bg-blue-500 text-white rounded">Send</button>
      </div>
      <PromptSuggestions />
    </div>
  );
};

export default Chatbox;
