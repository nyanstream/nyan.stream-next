import { useState } from 'react';

import type { PlayerType } from './types';
import { PlayerSettingsContext } from './PlayerSettingsContext';

export const PlayerSettingsContextProvider: React.FC = ({ children }) => {
    const [SelectedPlayer, setSelectedPlayer] = useState<PlayerType>('twitch-main');

    return (
        <PlayerSettingsContext.Provider
            value={{
                SelectedPlayer,
                setSelectedPlayer,
            }}>
            {children}
        </PlayerSettingsContext.Provider>
    );
};
