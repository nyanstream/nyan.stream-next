import { useMemo, useState, useEffect } from 'react';

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

	const [projectHost, setProjectHost] = useState<string>();

	useEffect(() => {
		setProjectHost(window.location.hostname);
	}, []);

	const playerURL = useMemo<string>(() => {
		if (!projectHost) {
			return '';
		}

		const getTwitchPlayerURL = (nickName: string) =>
			`https://player.twitch.tv/?channel=${nickName}&parent=${projectHost}&autoplay=true`;

		switch (SelectedPlayer) {
			case 'restreamer':
				return 'https://restreamer-app.blyat.science/af5a1666-ed20-408e-9608-4df83598182b.m3u8';

			case 'twitch':
				return getTwitchPlayerURL('animechurch');

			case 'twitch-backup':
				return getTwitchPlayerURL('zdesneanime');

			case 'twitch-monarhiq':
				return getTwitchPlayerURL('monarhiq');

			case 'twitch-hrk':
				return getTwitchPlayerURL('hrk40689');

			case 'twitch-rulait':
				return getTwitchPlayerURL('rulait');
		}
	}, [projectHost, SelectedPlayer]);

	return (
		<div ref={PlayerNodeRef} className={styles.player} suppressHydrationWarning>
			<div className={styles.player__container}>
				<Player
					isIframe={SelectedPlayer !== 'restreamer'}
					streamUrl={playerURL}
					previewImageUrl={ImageStreamPreview.src}
				/>
			</div>

			<PlayerNotification />
		</div>
	);
};
