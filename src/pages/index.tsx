import type { ReactComponent } from '@/types';

import { IndexPageContainer } from '@/components/IndexPage';

import { PlayerSettingsContextProvider } from '@/providers';

const IndexPage: ReactComponent = () => {
	return (
		<PlayerSettingsContextProvider>
			<IndexPageContainer />
		</PlayerSettingsContextProvider>
	);
};

export default IndexPage;
