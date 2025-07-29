export interface Message {
  sender: 'user' | 'assistant' | 'system';
  text: string;
}

export const PROFANITY_REGEX = /(damn|shit|fuck|bitch|asshole|<script|javascript:|onerror=|onload=)/i;

export function escapeHtml(text: string): string {
  return text.replace(/[&<>'"/]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;', '/': '&#x2F;'
  }[char] || ''));
}

export async function sendToHealingAgent(userId: string | null, userInput: string, context: Message[]): Promise<string> {
  await new Promise((r) => setTimeout(r, 1200));
  const responses = [
    "I'm here for you. Can you tell me more about how you're feeling right now?",
    "Thank you for sharing. Remember, your emotions are valid.",
    "Let's take a deep breath together. What would you like to focus on today?",
    "Would you like to try a gentle ritual or reflection exercise?"
  ];
  return responses[(context.length - 1) % responses.length];
}

export const SYSTEM_CONTEXT: Message[] = [
  { sender: 'system', text: "Mother's name: Sarah" },
  { sender: 'system', text: "Baby's name: Luna" },
  { sender: 'system', text: "Birth type: Natural" },
  { sender: 'system', text: "Primary emotion: Hopeful" }
];

export const MAX_MESSAGE_LENGTH = 1000;
export const SESSION_MESSAGES_KEY = 'vfh_chat_messages';
export const SESSION_RITUALS_KEY = 'vfh_rituals_today';

export function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(SESSION_MESSAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...SYSTEM_CONTEXT];
}
export function saveMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(SESSION_MESSAGES_KEY, JSON.stringify(messages));
  } catch {}
}
export function loadRitualsToday(): number {
  try {
    const raw = sessionStorage.getItem(SESSION_RITUALS_KEY);
    if (raw) return parseInt(raw, 10) || 0;
  } catch {}
  return 0;
}
export function saveRitualsToday(n: number) {
  try {
    sessionStorage.setItem(SESSION_RITUALS_KEY, n.toString());
  } catch {}
}

export function sanitizeInput(text: string): string {
  let clean = text.trim();
  if (!clean) return '';
  if (clean.length > MAX_MESSAGE_LENGTH) clean = clean.slice(0, MAX_MESSAGE_LENGTH);
  if (PROFANITY_REGEX.test(clean)) return '';
  clean = escapeHtml(clean);
  return clean;
}

export function isRepeatMessage(messages: Message[], text: string): boolean {
  return messages.length > 0 && messages[messages.length - 1].text === text;
}

export function getOnboardingComplete(): boolean {
  try {
    return sessionStorage.getItem('vfh_onboarding_complete') === 'true';
  } catch {
    return false;
  }
}

export function setOnboardingComplete(): void {
  try {
    sessionStorage.setItem('vfh_onboarding_complete', 'true');
  } catch {}
}

export function getUserId(): string | null {
  try {
    return sessionStorage.getItem('vfh_userId');
  } catch {
    return null;
  }
} 