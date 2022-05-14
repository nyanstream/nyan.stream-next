import { useState, useEffect, useCallback } from 'react';

import type { ReactComponent } from '@/utilities/types';

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

    return (
        <ThemeContextContext.Provider
            value={{
                Theme,
                setTheme: handleThemeChange,
            }}>
            {children}
        </ThemeContextContext.Provider>
    );
};
