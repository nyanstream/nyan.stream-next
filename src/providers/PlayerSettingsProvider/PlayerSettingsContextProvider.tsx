import React from 'react';

import type { ReactComponent } from '@/types';

import type { PlayerType } from './types';
import { PlayerSettingsContext } from './PlayerSettingsContext';

export const PlayerSettingsContextProvider: ReactComponent = ({ children }) => {
    const [SelectedPlayer, setSelectedPlayerInState] = React.useState<PlayerType>(getSelectedPlayerFromLocalStorage());

    const setSelectedPlayer = React.useCallback((selectedPlayer: PlayerType) => {
        setSelectedPlayerInState(selectedPlayer);
        window.localStorage.setItem(STORAGE_ITEM_NAME, selectedPlayer);
    }, []);

    const PlayerNodeRef = React.useRef<HTMLDivElement>(null);

    return (
        <PlayerSettingsContext.Provider
            value={{
                SelectedPlayer,
                setSelectedPlayer,
                PlayerNodeRef,
            }}>
            {children}
        </PlayerSettingsContext.Provider>
    );
};

const STORAGE_ITEM_NAME = 'nyan:selected-player';

const getSelectedPlayerFromLocalStorage = () => {
    const players: PlayerType[] = ['twitch-main', 'twitch-backup', 'wasd'];
    const defaultPlayer: PlayerType = 'twitch-main';

    // https://stackoverflow.com/a/68683935/21009697
    if (typeof window === 'undefined') return defaultPlayer;

    const storageValue = localStorage.getItem(STORAGE_ITEM_NAME) as PlayerType | null;
    if (!storageValue || !players.includes(storageValue as PlayerType)) return defaultPlayer;

    return storageValue;
};
