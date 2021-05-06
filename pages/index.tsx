import IndexPageContainer from '../src/Components/IndexPage/IndexPageContainer';
import WarningMessage from '../src/Components/IndexPage/WarningMessage/WarningMessage';

const IndexPage: React.FC = () => {
    return (
        <WarningMessage>
            <IndexPageContainer />
        </WarningMessage>
    );
};

export default IndexPage;
