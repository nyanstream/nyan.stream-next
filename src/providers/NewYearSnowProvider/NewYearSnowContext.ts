import { createContext } from 'react';

type NewYearSnowContextValue = {
	IsNewYearSnowEnabled: boolean;
	setIsNewYearSnowEnabled: (isNewYearSnowEnabled: boolean) => void;
};

export const NewYearSnowContext = createContext({} as NewYearSnowContextValue);
