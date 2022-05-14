import { useState, useRef } from 'react';

import type { ReactComponent } from '@/utilities/types';

import type { PlayerType } from './types';
import { PlayerSettingsContext } from './PlayerSettingsContext';

export const PlayerSettingsContextProvider: ReactComponent = ({ children }) => {
    const [SelectedPlayer, setSelectedPlayer] = useState<PlayerType>('wasd');

    const PlayerNodeRef = useRef<HTMLDivElement>(null);

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
