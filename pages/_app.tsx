import type { AppProps } from 'next/app';

import { IconContext } from 'react-icons';

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsPluginDuration from 'dayjs/plugin/duration';
import dayjsLocaleRu from 'dayjs/locale/ru';

import '../src/styles/every.scss';

dayjs.extend(dayjsPluginRelativeTime);
dayjs.extend(dayjsPluginDuration);
dayjs.locale(dayjsLocaleRu);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <IconContext.Provider value={{ className: 'nyan-icon' }}>
            <Component {...pageProps} />
        </IconContext.Provider>
    );
};

export default MyApp;
