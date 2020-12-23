import type { AppProps } from 'next/app';

import { IconContext } from 'react-icons';

import '../src/styles/every.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <IconContext.Provider value={{ className: 'nyan-icon' }}>
            <Component {...pageProps} />
        </IconContext.Provider>
    );
};

export default MyApp;
