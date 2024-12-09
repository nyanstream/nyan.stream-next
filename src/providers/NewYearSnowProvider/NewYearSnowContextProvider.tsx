import { useState, useEffect, useCallback } from 'react';

import type { ReactComponent } from '@/types';

import { storageGet, storageSet } from '@/utilities/storage';

import { NewYearSnowContext } from './NewYearSnowContext';

const StorageItemName = 'nyan_new_year_snow_2024';

export const NewYearSnowContextProvider: ReactComponent = ({ children }) => {
	const [IsNewYearSnowEnabled, setIsNewYearSnowEnabled] = useState(true);

	useEffect(() => {
		const currentStorageValue = storageGet<'true' | 'false'>(StorageItemName, 'true');
		setIsNewYearSnowEnabled(currentStorageValue === 'true');
	}, []);

	const handleIsNewYearSnowEnabledChange = useCallback((isNewYearSnowEnabled: boolean) => {
		setIsNewYearSnowEnabled(isNewYearSnowEnabled);
		storageSet(StorageItemName, String(isNewYearSnowEnabled));
	}, []);

	return (
		<NewYearSnowContext.Provider
			value={{
				IsNewYearSnowEnabled,
				setIsNewYearSnowEnabled: handleIsNewYearSnowEnabledChange,
			}}>
			{children}
		</NewYearSnowContext.Provider>
	);
};
