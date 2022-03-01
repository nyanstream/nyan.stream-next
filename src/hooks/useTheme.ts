import { useContext } from 'react';

import { ThemeContextContext } from '@/providers';

export const useTheme = () => {
    return useContext(ThemeContextContext);
};
