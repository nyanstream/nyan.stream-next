import { useMemo, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

import { getDateFormated } from '@/utilities/dates';

import type { ScheduleItemType } from '@/api/types';

import { useTheme } from '@/hooks';

import { Link } from '@/components/common';

import styles from './ScheduleItem.module.scss';

type PropsType = {
    AirIndex: number;
    AirData: ScheduleItemType;
    AirsArray: ScheduleItemType[];
    NextAirsData: ScheduleItemType[];
};

const ScheduleItem: React.FC<PropsType> = props => {
    const { AirIndex, AirData } = props;
    const { AirsArray, NextAirsData } = props;

    const { Theme } = useTheme();

    const AirStartTime = AirData.s * 1000;
    const AirEndTime = AirStartTime + AirData.d * 1000;

    const AirStatus = useMemo(() => {
        let airStatus: undefined | 'current' | 'next' | 'finished' | 'not-today';

        if (dayjs().isBefore(AirEndTime) && dayjs().isAfter(AirStartTime)) {
            airStatus = 'current';
        }

        if (dayjs().isBefore(AirStartTime) && NextAirsData[0] && AirStartTime === NextAirsData[0].s * 1000) {
            airStatus = 'next';
        }

        if (dayjs().isAfter(AirEndTime)) {
            airStatus = 'finished';
        }

        if (dayjs().diff(AirStartTime, 'day') < 0) {
            airStatus = 'not-today';
        }

        return airStatus;
    }, [AirStartTime, AirEndTime, NextAirsData]);

    const AirPhrase = useMemo(() => {
        const PreviousAir: ScheduleItemType | undefined = AirsArray[AirIndex - 1];
        const IsAirsCollision = PreviousAir ? (PreviousAir.s + PreviousAir.d) * 1000 === AirStartTime : false;

        let airPhrase: string | undefined;

        switch (AirStatus) {
            case 'next':
                airPhrase = IsAirsCollision ? 'Далее' : dayjs(AirStartTime).fromNow();
                break;

            case 'current':
                airPhrase = `ещё ${dayjs(AirEndTime).toNow(true)}`;
                break;
        }

        return airPhrase;
    }, [AirsArray, AirIndex, AirStartTime, AirEndTime, AirStatus]);

    const AirDurationPhrase = useMemo(() => {
        let airDurationPhrase = 'Длится';

        switch (AirStatus) {
            case 'finished':
                airDurationPhrase = 'Длилось';
                break;
            case 'next':
            case 'not-today':
                airDurationPhrase = 'Будет длиться';
                break;
        }

        return airDurationPhrase;
    }, [AirStatus]);

    const CurrentYear = new Date().getFullYear();

    const IsNeedToShowAirYear = dayjs(AirEndTime).year() !== CurrentYear || dayjs(AirStartTime).year() !== CurrentYear;

    const formatAirTime = useCallback(
        (date: Date, isNeedToShowAirYear: boolean) =>
            getDateFormated({
                date,
                extraConfig: {
                    year: isNeedToShowAirYear ? 'numeric' : undefined,
                    hour: 'numeric',
                    minute: 'numeric',
                },
            }),
        []
    );

    const getHumanizedAirDuration = useCallback((airDuration: number) => {
        const duration = dayjs.duration({ seconds: airDuration });

        const hours = duration.asHours();
        const text = hours <= 21 ? duration.humanize() : 'около дня';

        return hours < 24 ? text : 'больше дня';
    }, []);

    return (
        <li className={styles.scheduleItem} data-status={AirStatus} data-theme={Theme}>
            <div className={styles.scheduleItem__title}>
                <ReactMarkdown>{AirData.title}</ReactMarkdown>
            </div>

            <div className={styles.scheduleItem__data}>
                <div className={styles.scheduleItem__startTime}>{formatAirTime(dayjs(AirStartTime).toDate(), IsNeedToShowAirYear)}</div>

                <div className={styles.scheduleItem__duration}>
                    <span title={`Время окончания: ${formatAirTime(dayjs(AirEndTime).toDate(), IsNeedToShowAirYear)}`}>
                        {AirDurationPhrase} {getHumanizedAirDuration(AirData.d)}
                    </span>
                </div>

                {AirPhrase ? (
                    <div className={styles.scheduleItem__phrase}>
                        <span>{AirPhrase}</span>
                    </div>
                ) : null}

                {AirData.link ? (
                    <div className={styles.scheduleItem__link}>
                        <Link href={AirData.link}>Ссылка</Link>
                    </div>
                ) : null}
            </div>
        </li>
    );
};

export default ScheduleItem;
