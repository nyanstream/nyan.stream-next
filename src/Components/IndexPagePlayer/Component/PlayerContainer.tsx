import { useMemo, useState, useEffect } from 'react';

import type { PlayerType } from '../PlayerTypes';

import { IconTimes } from '../../common';

import styles from './Player.module.scss';

type PropsType = {
    SelectedPlayer: PlayerType;
};

const PlayerContainer: React.FC<PropsType> = props => {
    const { SelectedPlayer } = props;

    const [ProjectHost, setProjectHost] = useState<string>('');

    useEffect(() => {
        setProjectHost(window.location.hostname);
    }, []);

    const PlayerURL = useMemo<string>(() => {
        if (ProjectHost === '') {
            return '';
        }

        const getTwitchPlayerURL = (nickName: string) => `https://player.twitch.tv/?channel=${nickName}&parent=${ProjectHost}&autoplay=true`;

        switch (SelectedPlayer) {
            case 'wasd':
                return 'https://wasd.tv/embed/thenyan';

            case 'twitch-main':
                return getTwitchPlayerURL('nyan_stream');

            case 'twitch-backup':
                return getTwitchPlayerURL('zdesneanime');

            case 'asianwave':
                return getTwitchPlayerURL('asianwave');

            case 'gg':
                return 'https://goodgame.ru/player?144937#autoplay';
        }
    }, [ProjectHost, SelectedPlayer]);

    return (
        <div className={styles.player}>
            <div className={styles.player__embed}>
                <iframe src={PlayerURL} title="Player" />
            </div>
            <div className={styles.player__noti} aria-label="Оповещение">
                <div className={styles.player__noti__content}></div>
                <button className={styles.player__noti__hideBtn} title="Скрыть оповещение">
                    <IconTimes />
                </button>
            </div>
        </div>
    );
};

export default PlayerContainer;
