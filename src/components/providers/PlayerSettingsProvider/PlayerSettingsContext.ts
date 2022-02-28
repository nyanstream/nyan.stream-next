import { createContext } from 'react';

import type { PlayerType } from './types';

type PlayerSettingsContextType = {
    SelectedPlayer: PlayerType;
    setSelectedPlayer: (player: PlayerType) => void;
};

export const PlayerSettingsContext = createContext({} as PlayerSettingsContextType);
