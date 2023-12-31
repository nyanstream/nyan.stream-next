'use client';

import HLS from 'hls.js';
import { MediaPlayer, MediaProvider, MediaProviderAdapter, Poster, isHLSProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import { ReactComponent } from '@/types';

type PlayerProps = {
    streamUrl: string;
    previewImageUrl: string;
};

export const Player: ReactComponent<PlayerProps> = ({ streamUrl, previewImageUrl }) => {
    return (
        <MediaPlayer
            title="NYAN.STREAM"
            streamType="ll-live"
            src={streamUrl}
            onProviderChange={onProviderChange}
            autoplay
            volume={0.5}
            style={{ height: '100%' }}>
            <MediaProvider>
                <Poster className="vds-poster" src={previewImageUrl} alt="Stream is offline" />
            </MediaProvider>
            <DefaultVideoLayout icons={defaultLayoutIcons} hideQualityBitrate />
        </MediaPlayer>
    );
};

const onProviderChange = (provider: MediaProviderAdapter | null) => {
    if (isHLSProvider(provider)) {
        provider.library = HLS;
    }
};
