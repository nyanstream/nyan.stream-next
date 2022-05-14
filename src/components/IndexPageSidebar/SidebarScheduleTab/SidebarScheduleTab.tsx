import { useState, useMemo, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';

import useAPI from '@/hooks/useAPI';

import type { ReactComponent } from '@/utilities/types';
import { getDateFormated } from '@/utilities/dates';

import { getSchedule } from '@/api';
import type { ScheduleQueryResponseType } from '@/api/types';

import ScheduleItem from './ScheduleItem/ScheduleItem';

import styles from './SidebarScheduleTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
};

const SidebarScheduleTab: ReactComponent<PropsType> = props => {
    const { className, isVisible } = props;

    const [ScheduleData, setScheduleData] = useState<ScheduleQueryResponseType | null>(null);

    const [IsResponseError, setIsResponseError] = useState(false);
    const [ResponseTime, setResponseTime] = useState<Date | null>(null);

    const scheduleQuery = () => {
        getSchedule()
            .then(data => {
                setScheduleData(data);
                if (IsResponseError) {
                    setIsResponseError(false);
                }
            })
            .catch(() => {
                setIsResponseError(true);
            });
    };

    useAPI(scheduleQuery, 10);

    useEffect(() => {
        setResponseTime(new Date());
    }, [ScheduleData]);

    const OnlyNeededAirsData = useMemo<ScheduleQueryResponseType>(() => {
        return ScheduleData ? ScheduleData.filter(AirData => !AirData.secret && dayjs().diff(AirData.s * 1000, 'day') <= 1) : [];
    }, [ScheduleData]);

    const NextAirsData = useMemo<ScheduleQueryResponseType>(() => {
        return OnlyNeededAirsData.filter(AirData => AirData.s > dayjs().unix());
    }, [OnlyNeededAirsData]);

    const formatResponseTime = useCallback(
        (date: Date) => getDateFormated({ date, extraConfig: { year: undefined, hour: 'numeric', minute: 'numeric', second: 'numeric' } }),
        []
    );

    return (
        <section className={`${className} ${styles.schedule}`} hidden={!isVisible}>
            <div className={styles.schedule__status}>Последняя проверка: {ResponseTime ? formatResponseTime(ResponseTime) : null}</div>

            {ScheduleData && OnlyNeededAirsData.length === 0 ? <div className={styles.schedule__empty}>Расписание пустое ¯\_(ツ)_/¯</div> : null}

            <ul className={styles.schedule__items} hidden={OnlyNeededAirsData.length === 0}>
                {OnlyNeededAirsData.map((AirData, AirIndex, AirsArray) => (
                    <ScheduleItem key={AirIndex} {...{ AirData, AirIndex, AirsArray, NextAirsData }} />
                ))}
            </ul>
        </section>
    );
};

export default SidebarScheduleTab;
