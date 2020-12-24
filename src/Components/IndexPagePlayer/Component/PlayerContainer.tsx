import { useMemo } from 'react';

import CONFIG from '../../../config';

import type { PlayerType } from '../PlayerTypes';

import { IconTimes } from '../../common';

import styles from './Player.module.scss';

type PropsType = {
    SelectedPlayer: PlayerType;
};

const PlayerContainer: React.FC<PropsType> = props => {
    const { SelectedPlayer } = props;

    const { host: AppHost } = CONFIG;

    const PlayerURL = useMemo<string>(() => {
        const AppHostURL = new URL(AppHost);

        const getTwitchPlayerURL = (nickName: string) => `https://player.twitch.tv/?channel=${nickName}&parent=${AppHostURL.hostname}&autoplay=true`;

        switch (SelectedPlayer) {
            case 'twitch-backup':
                return getTwitchPlayerURL('zdesneanime');

            case 'asianwave':
                return getTwitchPlayerURL('asianwave');

            case 'gg':
                return 'https://goodgame.ru/player?144937#autoplay';

            default:
            case 'twitch-main':
                return getTwitchPlayerURL('nyan_stream');
        }
    }, [SelectedPlayer]);

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
