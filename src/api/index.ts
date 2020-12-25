import CONFIG from '../config';

import type { ScheduleQueryResponseType, NewsQueryResponseType, NotificationQueryResponseType } from './types';

const API = async <T>(method: string): Promise<T> => {
    const response = await fetch(`${CONFIG.api_host}/api/${method}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await (response.json() as Promise<T>);
};

export const getSchedule = async () => {
    return await API<ScheduleQueryResponseType>('sched');
};

export const getNews = async () => {
    return await API<NewsQueryResponseType>('vk-news');
};

export const getNotification = async () => {
    return await API<NotificationQueryResponseType>('noti');
};
