import { CHAT_API_HOST } from '@/config';

export const API_SSE_URL = new URL('sse', CHAT_API_HOST).href;
