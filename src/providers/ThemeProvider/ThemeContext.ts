import { createContext } from 'react';

import type { ThemeType } from './types';

type ThemeContextType = {
    Theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    switchTheme: () => void;
};

export const ThemeContextContext = createContext({} as ThemeContextType);
