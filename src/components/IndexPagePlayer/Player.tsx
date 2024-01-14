import clsx from 'clsx';

import HLS from 'hls.js';
import { MediaPlayer, MediaProvider, MediaProviderAdapter, Poster, isHLSProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { ReactComponent } from '@/types';

import styles from './Player.module.scss';

type PlayerProps = {
    isIframe?: boolean;
    streamUrl: string;
    previewImageUrl: string;
};

export const Player: ReactComponent<PlayerProps> = ({ isIframe, streamUrl, previewImageUrl }) => {
    if (isIframe) {
        return <iframe src={streamUrl} title="Player" allowFullScreen />;
    }

    return (
        <MediaPlayer
            className={styles.player__video__provider}
            title="NYAN.STREAM"
            streamType="ll-live"
            src={streamUrl}
            preferNativeHLS
            liveEdgeTolerance={1}
            onProviderChange={onProviderChange}
            autoplay
            muted>
            <MediaProvider className={styles.player__video}>
                <Poster className={clsx('vds-poster', styles.player__video__poster)} src={previewImageUrl} alt="Stream is offline" />
            </MediaProvider>
            <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    );
};

const onProviderChange = (provider: MediaProviderAdapter | null) => {
    if (isHLSProvider(provider)) {
        provider.library = HLS;
    }
};
