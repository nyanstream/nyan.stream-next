import { SnatApiClient } from '@/api/snat';

import { CHAT_API_HOST } from '@/config';

export const apiClient = new SnatApiClient({ baseUrl: CHAT_API_HOST });
