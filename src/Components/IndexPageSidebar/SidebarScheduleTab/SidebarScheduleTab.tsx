import { useState, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';

import useAPI from '../../../hooks/useAPI';

import { getDateFormated } from '../../../utilities/dates';

import { getSchedule } from '../../../api';
import type { ScheduleQueryResponseType } from '../../../api/types';

import type { ThemeType } from '../../Container/ContainerTypes';

import { Link } from '../../common';

import styles from './SidebarScheduleTab.module.scss';

type PropsType = {
    className: string;
    isVisible: boolean;
    ContainerTheme: ThemeType;
};

const SidebarScheduleTab: React.FC<PropsType> = props => {
    const { className, isVisible } = props;
    const { ContainerTheme } = props;

    const [ScheduleData, setScheduleData] = useState<ScheduleQueryResponseType | null>(null);
    const [IsResponseError, setIsResponseError] = useState<boolean>(false);

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

    const formatResponseTime = (date: Date) =>
        getDateFormated({ date, extraConfig: { year: undefined, hour: 'numeric', minute: 'numeric', second: 'numeric' } });

    const formatAirTime = (date: Date, showYear: boolean) =>
        getDateFormated({ date, extraConfig: { year: showYear ? 'numeric' : undefined, hour: 'numeric', minute: 'numeric' } });

    const getHumanizedAirDuration = (airDuration: number) => {
        const duration = dayjs.duration({ seconds: airDuration });

        const hours = duration.asHours();
        const text = hours <= 21 ? duration.humanize() : 'около дня';

        return hours < 24 ? text : 'больше дня';
    };

    return (
        <section className={`${className} ${styles.schedule}`} data-theme={ContainerTheme} hidden={!isVisible}>
            <div className={styles.schedule__status}>Последняя проверка: {ResponseTime ? formatResponseTime(ResponseTime) : null}</div>
            {ScheduleData && OnlyNeededAirsData.length === 0 ? <div className={styles.schedule__empty}>Расписание пустое ¯\_(ツ)_/¯</div> : null}
            <ul className={styles.schedule__items} hidden={OnlyNeededAirsData.length === 0}>
                {OnlyNeededAirsData.map((AirData, AirIndex, AirsArray) => {
                    const AirStartTime = AirData.s * 1000;
                    const AirEndTime = AirStartTime + AirData.d * 1000;

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

                    const PreviousAir: typeof AirData | undefined = AirsArray[AirIndex - 1];
                    const IsAirsCollision = PreviousAir ? (PreviousAir.s + PreviousAir.d) * 1000 === AirStartTime : false;

                    let airPhrase: string | undefined;

                    switch (airStatus) {
                        case 'next':
                            airPhrase = IsAirsCollision ? 'Далее' : dayjs(AirStartTime).fromNow();
                            break;

                        case 'current':
                            airPhrase = `ещё ${dayjs(AirEndTime).toNow(true)}`;
                            break;
                    }

                    let airDurationPhrase = 'Длится';

                    switch (airStatus) {
                        case 'finished':
                            airDurationPhrase = 'Длилось';
                            break;
                        case 'next':
                        case 'not-today':
                            airDurationPhrase = 'Будет длиться';
                            break;
                    }

                    const CurrentYear = new Date().getFullYear();

                    const IsShowAirYear = dayjs(AirEndTime).year() !== CurrentYear || dayjs(AirStartTime).year() !== CurrentYear;

                    return (
                        <li key={`${AirData.s}__${AirData.s + AirData.d}`} className={styles.schedule__items__item} data-status={airStatus}>
                            <div className={styles.schedule__items__item__title}>
                                <ReactMarkdown>{AirData.title}</ReactMarkdown>
                            </div>
                            <div className={styles.schedule__items__item__data}>
                                <div className={styles.schedule__items__item__startTime}>
                                    {formatAirTime(dayjs(AirStartTime).toDate(), IsShowAirYear)}
                                </div>
                                <div className={styles.schedule__items__item__duration}>
                                    <span title={`Время окончания: ${formatAirTime(dayjs(AirEndTime).toDate(), IsShowAirYear)}`}>
                                        {airDurationPhrase} {getHumanizedAirDuration(AirData.d)}
                                    </span>
                                </div>
                                {airPhrase ? (
                                    <div className={styles.schedule__items__item__phrase}>
                                        <span>{airPhrase}</span>
                                    </div>
                                ) : null}
                                {AirData.link ? (
                                    <div className={styles.schedule__items__item__link}>
                                        <Link href={AirData.link}>Ссылка</Link>
                                    </div>
                                ) : null}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default SidebarScheduleTab;
