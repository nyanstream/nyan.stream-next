import React from 'react';

import ReactPlayer from 'react-player/lazy';
import hlsjs, { type HlsConfig, type RetryConfig } from 'hls.js';

import type { ReactComponent } from '@/types';

import styles from './Player.module.scss';

type PlayerProps = {
    streamUrl: string;
    previewImageUrl: string;
};

export const Player: ReactComponent<PlayerProps> = ({ streamUrl, previewImageUrl }) => {
    const playerRef = React.useRef(null);
    const playerId = React.useId();

    React.useEffect(() => {
        window.Hls = hlsjs;
    }, []);

    return (
        <ReactPlayer
            ref={playerRef}
            url={streamUrl}
            controls
            muted
            width="100%"
            height="100%"
            onError={(_, data) => handleError(data, playerRef.current)}
            onEnded={() => handleEnded(playerRef.current)}
            config={{
                file: {
                    forceHLS: true,
                    forceSafariHLS: true,
                    hlsOptions: hlsConfig,
                    attributes: {
                        className: styles.player__video,
                        poster: previewImageUrl,
                        autoPlay: true,
                        // controlsList: 'nodownload noplaybackrate',
                    } satisfies React.VideoHTMLAttributes<HTMLVideoElement>,
                },
                twitch: {
                    playerId,
                    options: {
                        autoplay: true,
                    },
                },
            }}
        />
    );
};

const handleError = (data: any, player: any) => {
    //
};

const handleEnded = (player: any) => {
    //
};

const hlsCommonRetryConfig = {
    maxNumRetry: 0,
    retryDelayMs: 1500,
    maxRetryDelayMs: 1500,
    shouldRetry: () => true,
} as RetryConfig;

const hlsConfig = {
    enableWorker: true,
    lowLatencyMode: true,
    fragLoadPolicy: {
        default: {
            maxTimeToFirstByteMs: 15_000,
            maxLoadTimeMs: 30_000,
            timeoutRetry: hlsCommonRetryConfig,
            errorRetry: hlsCommonRetryConfig,
        },
    },
} as Partial<HlsConfig>;
