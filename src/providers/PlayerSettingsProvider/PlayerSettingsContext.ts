import { createContext } from 'react';

import type { PlayerType } from './types';

type PlayerSettingsContextType = {
    SelectedPlayer: PlayerType;
    setSelectedPlayer: (player: PlayerType) => void;
    PlayerNodeRef: React.RefObject<HTMLDivElement>;
};

export const PlayerSettingsContext = createContext({} as PlayerSettingsContextType);
