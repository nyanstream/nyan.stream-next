import CONFIG from '../config';

import type { NewsQueryResponseType, NotificationQueryResponseType } from './types';

const API = <T>(method: string): Promise<T> => {
    return fetch(`${CONFIG.api_host}/api/${method}`, { cache: 'no-store' }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
    });
};

export const getSchedule = async () => {
    return await API<NewsQueryResponseType>('sched');
};

export const getNews = async () => {
    return await API<NewsQueryResponseType>('vk-news');
};

export const getNotification = async () => {
    return await API<NotificationQueryResponseType>('noti');
};
