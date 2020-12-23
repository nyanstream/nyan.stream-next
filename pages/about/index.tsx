import Head from 'next/head';

import Header from '../../src/Components/Header/Component/Header';

const AboutPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>NYAN.STREAM / О проекте</title>
                <meta property="og:title" content="NYAN.STREAM" key="title" />
            </Head>
            <div className="container container--main">
                <Header pageName="О проекте" />
                <main className="page">test</main>
            </div>
        </>
    );
};

export default AboutPage;
