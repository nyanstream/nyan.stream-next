import { SnatApiClient } from '@/api/snat';

import { API_URL } from './constants';

export const apiClient = new SnatApiClient({ baseUrl: API_URL });
