import React, { useState, useRef, useEffect } from 'react';
import {
  Message,
  PROFANITY_REGEX,
  escapeHtml,
  sendToHealingAgent,
  SYSTEM_CONTEXT,
  MAX_MESSAGE_LENGTH,
  SESSION_MESSAGES_KEY,
  SESSION_RITUALS_KEY,
  loadMessages,
  saveMessages,
  loadRitualsToday,
  saveRitualsToday,
  sanitizeInput,
  isRepeatMessage
} from '../lib/chat';

interface HealingChatWindowProps {
  userId: string | null;
  isPremium: boolean;
}

const HealingChatWindow: React.FC<HealingChatWindowProps> = ({ userId, isPremium }) => {
  const [messages, setMessages] = useState<Message[]>(loadMessages());
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ritualsToday, setRitualsToday] = useState(loadRitualsToday());
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const prevMsgCountRef = useRef<number>(messages.length);

  useEffect(() => { saveMessages(messages); }, [messages]);
  useEffect(() => { saveRitualsToday(ritualsToday); }, [ritualsToday]);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === SESSION_MESSAGES_KEY) {
        setMessages(loadMessages());
      } else if (e.key === SESSION_RITUALS_KEY) {
        setRitualsToday(loadRitualsToday());
      }
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMsgCountRef.current = messages.length;
  }, [messages]);

  const canSend = isPremium || ritualsToday < 1;

  async function handleSend() {
    setError(null);
    const clean = sanitizeInput(input);
    if (!clean) {
      setError('Please enter a valid, respectful message.');
      return;
    }
    if (isRepeatMessage(messages, clean)) {
      setError('Please avoid repeating the same message.');
      return;
    }
    if (!canSend) {
      setError('Daily ritual limit reached. Upgrade for unlimited access.');
      return;
    }
    setMessages((msgs) => [...msgs, { sender: 'user', text: clean }]);
    setInput('');
    setLoading(true);
    const reply = await sendToHealingAgent(userId, clean, messages);
    setMessages((msgs) => [...msgs, { sender: 'assistant', text: reply }]);
    setLoading(false);
    if (!isPremium) setRitualsToday((n) => n + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="flex flex-col h-[70vh] max-h-[600px] w-full max-w-lg mx-auto bg-white rounded-xl shadow-lg p-4 relative">
      <div className="flex-1 overflow-y-auto mb-2 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`px-4 py-2 rounded-2xl shadow text-sm max-w-[80%] whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-pink-100 text-pink-900'
                  : msg.sender === 'assistant'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-100 text-gray-600 italic'
              }`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-4 py-2 rounded-2xl shadow bg-blue-100 text-blue-900 text-sm animate-pulse">
              The Healing Companion is thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={loading || !canSend}
        />
        <button
          className="px-4 py-2 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition disabled:opacity-50"
          onClick={handleSend}
          disabled={loading || !canSend}
        >
          Send
        </button>
      </div>
      {error && <div className="mt-2 text-red-500 text-sm text-center">{error}</div>}
      {!isPremium && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Free users are limited to 1 ritual per day. Upgrade for unlimited access.
        </div>
      )}
    </div>
  );
};

export default HealingChatWindow; 