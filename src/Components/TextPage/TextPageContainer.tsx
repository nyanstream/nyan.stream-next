import Container from '../Container/Container';

import styles from './TextPage.module.scss';

type PropsType = {
    pageName: string;
    children: React.ReactNode | React.ReactNode[];
};

const TextPageContainer: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { children } = props;

    return (
        <Container {...{ pageName }}>
            <main className={styles.textPage}>{children}</main>
        </Container>
    );
};

export default TextPageContainer;
