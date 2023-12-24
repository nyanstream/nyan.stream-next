import { createContext } from 'react';

import type { ThemeType } from './types';

type NewYearSnowContextValue = {
    IsNewYearSnowEnabled: boolean;
    setIsNewYearSnowEnabled: (theme: ThemeType) => void;
};

export const NewYearSnowContext = createContext({} as NewYearSnowContextValue);
