import React from 'react';

import type { ReactComponent } from '@/types';

import type { PlayerType } from './types';
import { PlayerSettingsContext } from './PlayerSettingsContext';

export const PlayerSettingsContextProvider: ReactComponent = ({ children }) => {
    const [SelectedPlayer, setSelectedPlayerInState] = React.useState<PlayerType>(getSelectedPlayerFromUrlOrLocalStorage());

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

const URL_PARAM_NAME = 'player';
const STORAGE_ITEM_NAME = 'nyan:selected-player';

const getSelectedPlayerFromUrlOrLocalStorage = () => {
    const players: PlayerType[] = ['restreamer', 'twitch', 'twitch-monarhiq', 'twitch-hrk', 'twitch-rulait'];

    const defaultPlayer: PlayerType = 'twitch';

    // https://stackoverflow.com/a/68683935/21009697

    if (typeof window === 'undefined') return defaultPlayer;

    const locationSearchParams = new URLSearchParams(location.search);

    const searchValue = locationSearchParams.get(URL_PARAM_NAME) as PlayerType | null;
    if (searchValue && players.includes(searchValue as PlayerType)) return searchValue;

    const storageValue = localStorage.getItem(STORAGE_ITEM_NAME) as PlayerType | null;
    if (storageValue && players.includes(storageValue as PlayerType)) return storageValue;

    return defaultPlayer;
};
