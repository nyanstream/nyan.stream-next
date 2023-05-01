import { useMemo, useState, useEffect } from 'react';

import type { ReactComponent } from '@/types';

import { usePlayerSettings } from '@/hooks';

import PlayerNotification from './PlayerNotification/PlayerNotification';

import styles from './Player.module.scss';

const PlayerContainer: ReactComponent = () => {
    const { SelectedPlayer, PlayerNodeRef } = usePlayerSettings();

    const [ProjectHost, setProjectHost] = useState<string>();

    useEffect(() => {
        setProjectHost(window.location.hostname);
    }, []);

    const PlayerURL = useMemo<string>(() => {
        if (!ProjectHost) {
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

            case 'twitch-monarhiq':
                return getTwitchPlayerURL('monarhiq');

            case 'twitch-hrk':
                return getTwitchPlayerURL('hrk40689');

            case 'twitch-rulait':
                return getTwitchPlayerURL('rulait');
        }
    }, [ProjectHost, SelectedPlayer]);

    return (
        <div ref={PlayerNodeRef} className={styles.player}>
            <div className={styles.player__embed}>
                <iframe src={PlayerURL} title="Player" allowFullScreen />
            </div>

            <PlayerNotification />
        </div>
    );
};

export { PlayerContainer };
