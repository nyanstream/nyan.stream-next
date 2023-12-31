import { useMemo, useState, useEffect } from 'react';

import type { ReactComponent } from '@/types';

import { usePlayerSettings } from '@/hooks';

import PlayerNotification from './PlayerNotification/PlayerNotification';

import { ImageShare } from '@/static/images';

import { Player } from './Player';

import styles from './Player.module.scss';

export const PlayerContainer: ReactComponent = () => {
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
            case 'restreamer':
                return 'https://restreamer-app.blyat.science/af5a1666-ed20-408e-9608-4df83598182b.m3u8';

            case 'wasd':
                return 'https://wasd.tv/embed/thenyan';

            case 'twitch':
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
        <div ref={PlayerNodeRef} className={styles.player} suppressHydrationWarning>
            <div className={styles.player__embed}>
                {SelectedPlayer === 'restreamer' ? (
                    <Player streamUrl={PlayerURL} previewImageUrl={ImageShare.src} />
                ) : (
                    <iframe src={PlayerURL} title="Player" allowFullScreen />
                )}
            </div>

            <PlayerNotification />
        </div>
    );
};
