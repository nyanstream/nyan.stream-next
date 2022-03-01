import type { AppProps } from 'next/app';

import { IconContext } from 'react-icons';

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsPluginDuration from 'dayjs/plugin/duration';
import dayjsLocaleRu from 'dayjs/locale/ru';

import { ThemeContextContextProvider } from '@/providers';

import '@/styles/every.scss';

dayjs.extend(dayjsPluginRelativeTime);
dayjs.extend(dayjsPluginDuration);
dayjs.locale(dayjsLocaleRu);

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeContextContextProvider>
            <IconContext.Provider value={{ className: 'nyan-icon' }}>
                <Component {...pageProps} />
            </IconContext.Provider>
        </ThemeContextContextProvider>
    );
};

export default App;
