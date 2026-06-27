// AI Provider helper for client-side or future enhancements
export const AI_PROVIDERS = {
  openai: 'OpenAI (GPT-4o-mini)',
  gemini: 'Google Gemini (gemini-2.0-flash)',
  openrouter: 'OpenRouter (Gemini/Llama)',
};

export function getActiveProvider(): string {
  const metaAny = import.meta as any;
  if (metaAny.env?.VITE_OPENAI_API_KEY) return 'openai';
  if (metaAny.env?.VITE_GEMINI_API_KEY) return 'gemini';
  if (metaAny.env?.VITE_OPENROUTER_API_KEY) return 'openrouter';
  return 'fallback-engine';
}
