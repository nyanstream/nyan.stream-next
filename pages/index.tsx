import { IndexPageContainer } from '@/components/IndexPage';

import { PlayerSettingsContextProvider } from '@/providers';

const IndexPage: React.FC = () => {
    return (
        <PlayerSettingsContextProvider>
            <IndexPageContainer />
        </PlayerSettingsContextProvider>
    );
};

export default IndexPage;
