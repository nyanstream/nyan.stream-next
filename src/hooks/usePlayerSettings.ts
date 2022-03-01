import { useContext } from 'react';

import { PlayerSettingsContext } from '@/providers';

export const usePlayerSettings = () => {
    return useContext(PlayerSettingsContext);
};
