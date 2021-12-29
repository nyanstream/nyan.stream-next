import { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';

import { storageGet, storageSet } from '../../../utilities/storage';

import { getNotification } from '../../../api';
import type { NotificationQueryResponseType } from '../../../api/types';

import useAPI from '../../../hooks/useAPI';

import { IconTimes } from '../../common';

import styles from './PlayerNotification.module.scss';

const PlayerNotification: React.FC = () => {
    const [NotificationData, setNotificationData] = useState<NotificationQueryResponseType>({ enabled: false });
    const [IsResponseError, setIsResponseError] = useState(false);

    const [HiddenNotifications, setHiddenNotifications] = useState<number[]>([]);

    const StorageItemName = 'nyan_noti';

    useEffect(() => {
        setHiddenNotifications(JSON.parse(storageGet(StorageItemName, '[]')));
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

    const handleHideNotificationBtnClick = useCallback(
        (time: number | undefined) => {
            if (time) {
                const NewHiddenNotifications: number[] = [...HiddenNotifications, time];
                setHiddenNotifications(NewHiddenNotifications);
                storageSet(StorageItemName, JSON.stringify(NewHiddenNotifications));
            }
        },
        [HiddenNotifications, StorageItemName]
    );

    if (!NotificationData.enabled || HiddenNotifications.includes(NotificationData.time ?? -1) || !NotificationData.text) {
        return null;
    }

    return (
        <div
            className={styles.notification}
            style={NotificationData.color ? { backgroundColor: NotificationData.color } : {}}
            aria-label="Оповещение"
        >
            <div className={styles.notification__content}>
                <ReactMarkdown>{NotificationData.text}</ReactMarkdown>
            </div>

            <button
                className={styles.notification__hideBtn}
                title="Скрыть оповещение"
                onClick={() => handleHideNotificationBtnClick(NotificationData.time)}
            >
                <IconTimes />
            </button>
        </div>
    );
};

export default PlayerNotification;
