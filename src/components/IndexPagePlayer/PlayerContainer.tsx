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

		const getVkVideoPlayerURL = (nickName: string) =>
			`https://live.vkvideo.ru/app/embed/${nickName}?autoplay=true`;

		switch (SelectedPlayer) {
			case 'vk':
				return getVkVideoPlayerURL('animechurch');

			case 'twitch':
				return getTwitchPlayerURL('zdesneanime');

			case 'twitch-monarhiq':
				return getTwitchPlayerURL('monarhiq');

			case 'twitch-banan':
				return getTwitchPlayerURL('rcm92587');

			case 'twitch-rulait':
				return getTwitchPlayerURL('rulait');
		}
	}, [projectHost, SelectedPlayer]);

	return (
		<div ref={PlayerNodeRef} className={styles.player} suppressHydrationWarning>
			<div className={styles.player__container}>
				<Player isIframe streamUrl={playerURL} previewImageUrl={ImageStreamPreview.src} />
			</div>

			<PlayerNotification />
		</div>
	);
};
