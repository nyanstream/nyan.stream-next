import React from 'react';

import dynamic from 'next/dynamic';

import type { ReactComponent } from '@/types';

import { usePlayerSettings } from '@/hooks';

import { ImageStreamPreview } from '@/static/images';

import { PlayerNotification } from './PlayerNotification/PlayerNotification';

import styles from './Player.module.scss';

const Player = dynamic(() => import('./Player').then(mod => mod.Player), {
    ssr: false,
});

export const PlayerContainer: ReactComponent = () => {
    const { SelectedPlayer, PlayerNodeRef } = usePlayerSettings();

    const playerURL = React.useMemo<string>(() => {
        const getTwitchPlayerURL = (nickName: string) => `https://twitch.tv/${nickName}`;

        switch (SelectedPlayer) {
            case 'restreamer':
                return 'https://restreamer-app.blyat.science/af5a1666-ed20-408e-9608-4df83598182b.m3u8';

            case 'twitch':
                return getTwitchPlayerURL('zdesneanime');

            case 'twitch-monarhiq':
                return getTwitchPlayerURL('monarhiq');

            case 'twitch-hrk':
                return getTwitchPlayerURL('hrk40689');

            case 'twitch-rulait':
                return getTwitchPlayerURL('rulait');
        }
    }, [SelectedPlayer]);

    return (
        <div ref={PlayerNodeRef} className={styles.player} suppressHydrationWarning>
            <div className={styles.player__container}>
                <Player streamUrl={playerURL} previewImageUrl={ImageStreamPreview.src} />
            </div>

            <PlayerNotification />
        </div>
    );
};
