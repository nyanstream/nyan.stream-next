import Head from 'next/head';
import Link from 'next/link';

import Header from '../src/Components/Header/Header';

const IndexPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>NYAN.STREAM</title>
                <meta property="og:title" content="NYAN.STREAM" key="title" />
            </Head>
            <div className="container container--main">
                <Header />
                <main className="main">
                    <Link href="/about">to about</Link>
                </main>
            </div>
        </>
    );
};

export default IndexPage;
