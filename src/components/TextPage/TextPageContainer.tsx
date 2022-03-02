import { useTheme } from '@/hooks';

import { Container } from '@/components/Container';

import styles from './TextPage.module.scss';

type PropsType = {
    pageName: string;
};

const TextPageContainer: React.FC<PropsType> = props => {
    const { pageName } = props;
    const { children } = props;

    const { Theme } = useTheme();

    return (
        <Container {...{ pageName }}>
            <main className={styles.textPage} data-theme={Theme}>
                {children}
            </main>
        </Container>
    );
};

export { TextPageContainer };
