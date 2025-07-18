import React, { useState, useRef, useEffect } from 'react';

interface HealingChatWindowProps {
  userId: string | null;
  isPremium: boolean;
}

interface Message {
  sender: 'user' | 'assistant' | 'system';
  text: string;
}

// Profanity/injection filter (basic)
const PROFANITY_REGEX = /(damn|shit|fuck|bitch|asshole|<script|javascript:|onerror=|onload=)/i;

// HTML escape utility
function escapeHtml(text: string): string {
  return text.replace(/[&<>'"/]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '/': '&#x2F;'
  }[char] || ''));
}

// Simulated AI handler
async function sendToHealingAgent(userId: string | null, userInput: string, context: Message[]): Promise<string> {
  // Simulate delay
  await new Promise((r) => setTimeout(r, 1200));
  // Simulated responses
  const responses = [
    "I'm here for you. Can you tell me more about how you're feeling right now?",
    "Thank you for sharing. Remember, your emotions are valid.",
    "Let's take a deep breath together. What would you like to focus on today?",
    "Would you like to try a gentle ritual or reflection exercise?"
  ];
  // Cycle through responses
  return responses[(context.length - 1) % responses.length];
}

// System context (injected on first message)
const SYSTEM_CONTEXT: Message[] = [
  { sender: 'system', text: "Mother's name: Sarah" },
  { sender: 'system', text: "Baby's name: Luna" },
  { sender: 'system', text: "Birth type: Natural" },
  { sender: 'system', text: "Primary emotion: Hopeful" }
];

const MAX_MESSAGE_LENGTH = 1000;

const SESSION_MESSAGES_KEY = 'vfh_chat_messages';
const SESSION_RITUALS_KEY = 'vfh_rituals_today';

function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(SESSION_MESSAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...SYSTEM_CONTEXT];
}
function saveMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
  } catch {}
}
function loadRitualsToday(): number {
  try {
    const raw = sessionStorage.getItem(SESSION_RITUALS_KEY);
    if (raw) return parseInt(raw, 10) || 0;
  } catch {}
  return 0;
}
function saveRitualsToday(n: number) {
  try {
    sessionStorage.setItem(SESSION_RITUALS_KEY, n.toString());
  } catch {}
}

const HealingChatWindow: React.FC<HealingChatWindowProps> = ({ userId, isPremium }) => {
  const [messages, setMessages] = useState<Message[]>(loadMessages());
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ritualsToday, setRitualsToday] = useState(loadRitualsToday());
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const prevMsgCountRef = useRef<number>(messages.length);

  // Sync messages and ritualsToday to sessionStorage
  useEffect(() => { saveMessages(messages); }, [messages]);
  useEffect(() => { saveRitualsToday(ritualsToday); }, [ritualsToday]);

  // Listen for sessionStorage changes from other tabs/components
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

  // Auto-scroll to bottom only when a new message is added
  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMsgCountRef.current = messages.length;
  }, [messages]);

  // Ritual limit for free users
  const canSend = isPremium || ritualsToday < 1;

  // Input validation and sanitization
  function sanitizeInput(text: string) {
    let clean = text.trim();
    if (!clean) return '';
    if (clean.length > MAX_MESSAGE_LENGTH) clean = clean.slice(0, MAX_MESSAGE_LENGTH);
    if (PROFANITY_REGEX.test(clean)) return '';
    clean = escapeHtml(clean);
    return clean;
  }

  // Prevent repeated messages
  function isRepeatMessage(text: string) {
    return messages.length > 0 && messages[messages.length - 1].text === text;
  }

  // Handle send
  async function handleSend() {
    setError(null);
    const clean = sanitizeInput(input);
    if (!clean) {
      setError('Please enter a valid, respectful message.');
      return;
    }
    if (isRepeatMessage(clean)) {
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
    // Simulate AI response
    const reply = await sendToHealingAgent(userId, clean, messages);
    setMessages((msgs) => [...msgs, { sender: 'assistant', text: reply }]);
    setLoading(false);
    if (!isPremium) setRitualsToday((n) => n + 1);
  }

  // Handle enter key
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