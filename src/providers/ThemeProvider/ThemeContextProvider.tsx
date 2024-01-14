import { useState, useEffect, useCallback } from 'react';

import type { ReactComponent } from '@/types';

import { storageGet, storageSet } from '@/utilities/storage';

import type { ThemeType } from './types';
import { ThemeContextContext } from './ThemeContext';

const StorageItemName = 'nyan_theme';

export const ThemeContextContextProvider: ReactComponent = ({ children }) => {
	const [Theme, setTheme] = useState<ThemeType>('sun');

	useEffect(() => {
		setTheme(storageGet<ThemeType>(StorageItemName, 'sun'));
	}, []);

	const handleThemeChange = useCallback((theme: ThemeType) => {
		setTheme(theme);
		storageSet(StorageItemName, theme);
	}, []);

	const handleThemeSwitch = useCallback(() => {
		setTheme(currentTheme => {
			const newTheme = currentTheme === 'moon' ? 'sun' : 'moon';
			storageSet(StorageItemName, newTheme);
			return newTheme;
		});
	}, []);

	return (
		<ThemeContextContext.Provider
			value={{
				Theme,
				setTheme: handleThemeChange,
				switchTheme: handleThemeSwitch,
			}}>
			{children}
		</ThemeContextContext.Provider>
	);
};
