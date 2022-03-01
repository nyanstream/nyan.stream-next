import { useMemo, useState, useEffect } from 'react';

import { usePlayerSettings } from '@/hooks';

import PlayerNotification from './PlayerNotification/PlayerNotification';

import styles from './Player.module.scss';

const PlayerContainer: React.FC = () => {
    const { SelectedPlayer } = usePlayerSettings();

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
        }
    }, [ProjectHost, SelectedPlayer]);

    return (
        <div className={styles.player} data-player>
            <div className={styles.player__embed}>
                <iframe src={PlayerURL} title="Player" allowFullScreen />
            </div>

            <PlayerNotification />
        </div>
    );
};

export { PlayerContainer };
