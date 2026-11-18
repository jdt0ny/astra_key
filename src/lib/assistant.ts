export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantReply {
  reply: string;
  bookingUrl: string | null;
}

export const ASSISTANT = {
  endpoint: (import.meta.env.VITE_ASSISTANT_ENDPOINT ?? '').trim(),
  /**
   * Public scheduling page. Set it with VITE_BOOKING_URL and keep it in sync
   * with BOOKING_URL in worker/wrangler.toml (used in the system prompt).
   */
  bookingUrl: (
    import.meta.env.VITE_BOOKING_URL ||
    'https://cal.com/tony-russo-kwvzt9/call-sviluppo-software-automazioni-e-ai?overlayCalendar=true'
  ).trim(),
  maxInputLength: 600,
  maxHistory: 12,
} as const;

export const isAssistantEnabled = ASSISTANT.endpoint.length > 0;

export function sanitizeBookingUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.includes('REPLACE-ME')) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return url.toString();
    }
  } catch {
    // Invalid URL: no booking link is shown.
  }

  return null;
}

interface RequestAssistantOptions {
  messages: readonly AssistantMessage[];
  language: 'it' | 'en';
  signal?: AbortSignal;
}

export async function requestAssistant({
  messages,
  language,
  signal,
}: RequestAssistantOptions): Promise<AssistantReply> {
  const controller = new AbortController();
  const forwardAbort = () => controller.abort();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);

  signal?.addEventListener('abort', forwardAbort, { once: true });

  try {
    const response = await fetch(ASSISTANT.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, language }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Assistant request failed with status ${response.status}.`);
    }

    const payload: unknown = await response.json();

    if (typeof payload !== 'object' || payload === null) {
      throw new Error('Assistant returned an invalid payload.');
    }

    const reply = (payload as { reply?: unknown }).reply;

    if (typeof reply !== 'string' || !reply.trim()) {
      throw new Error('Assistant returned an empty reply.');
    }

    const bookingUrl = (payload as { bookingUrl?: unknown }).bookingUrl;

    return {
      reply: reply.trim(),
      bookingUrl: sanitizeBookingUrl(bookingUrl) ?? sanitizeBookingUrl(ASSISTANT.bookingUrl),
    };
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener('abort', forwardAbort);
  }
}
