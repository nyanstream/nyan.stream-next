import type { AppProps } from 'next/app';

import { IconContext } from 'react-icons';

import dayjs from 'dayjs';
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime';
import dayjsPluginDuration from 'dayjs/plugin/duration';
import dayjsPluginLocalizedFormat from 'dayjs/plugin/localizedFormat';
import dayjsLocaleRu from 'dayjs/locale/ru';

import type { ReactComponent } from '@/types';

import { ThemeContextContextProvider } from '@/providers';

import '@/styles/root.scss';

dayjs.extend(dayjsPluginRelativeTime);
dayjs.extend(dayjsPluginDuration);
dayjs.extend(dayjsPluginLocalizedFormat);
dayjs.locale(dayjsLocaleRu);

const App: ReactComponent<AppProps> = ({ Component, pageProps }) => {
	return (
		<ThemeContextContextProvider>
			<IconContext.Provider value={{}}>
				<Component {...pageProps} />
			</IconContext.Provider>
		</ThemeContextContextProvider>
	);
};

export default App;
