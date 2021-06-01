import { useMemo, useState, useEffect } from 'react';

import type { PlayerType } from '../PlayerTypes';

import PlayerNotification from '../PlayerNotification/PlayerNotification';

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
        }
    }, [ProjectHost, SelectedPlayer]);

    return (
        <div className={styles.player} data-is="player">
            <div className={styles.player__embed}>
                <iframe src={PlayerURL} title="Player" allowFullScreen />
            </div>
            <PlayerNotification />
        </div>
    );
};

export default PlayerContainer;
