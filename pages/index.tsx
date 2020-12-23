import Head from 'next/head';

import Container from '../src/Components/Container/Container';

const IndexPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>NYAN.STREAM</title>
                <meta property="og:title" content="NYAN.STREAM" key="title" />
            </Head>
            <Container>
                <></>
            </Container>
        </>
    );
};

export default IndexPage;
