import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { storageGet, storageSet } from '../../../utilities/storage';

import { getNotification } from '../../../api';
import type { NotificationQueryResponseType } from '../../../api/types';

import useAPI from '../../../hooks/useAPI';

import { IconTimes } from '../../common';

import styles from './PlayerNotification.module.scss';

const PlayerNotification: React.FC = () => {
    const [NotificationData, setNotificationData] = useState<NotificationQueryResponseType>({ enabled: false });
    const [IsResponseError, setIsResponseError] = useState<boolean>(false);

    const [HiddenNotifications, setHiddenNotifications] = useState<number[]>([]);

    useEffect(() => {
        setHiddenNotifications(JSON.parse(storageGet('nyan_noti', '[]')));
    }, []);

    const notificationQuery = () => {
        getNotification()
            .then(data => {
                setNotificationData(data);
                if (IsResponseError) {
                    setIsResponseError(false);
                }
            })
            .catch(() => {
                setIsResponseError(true);
            });
    };

    useAPI(notificationQuery, 5);

    const handleHideNotificationBtnClick = (time: number) => {
        const NewHiddenNotifications: number[] = [...HiddenNotifications, time];
        setHiddenNotifications(NewHiddenNotifications);
        storageSet('nyan_noti', JSON.stringify(NewHiddenNotifications));
    };

    return NotificationData.enabled && !HiddenNotifications.includes(NotificationData.time ?? -1) && NotificationData.text ? (
        <div
            className={styles.notification}
            style={NotificationData.color ? { backgroundColor: NotificationData.color } : {}}
            aria-label="Оповещение">
            <div className={styles.notification__content}>
                <ReactMarkdown>{NotificationData.text}</ReactMarkdown>
            </div>
            <button
                className={styles.notification__hideBtn}
                title="Скрыть оповещение"
                onClick={() => (NotificationData.time ? handleHideNotificationBtnClick(NotificationData.time) : void 0)}>
                <IconTimes />
            </button>
        </div>
    ) : null;
};

export default PlayerNotification;
