import Head from 'next/head';
import Link from 'next/link';

const IndexPage = () => (
    <>
        <Head>
            <title>NYAN.STREAM</title>
            <meta property="og:title" content="NYAN.STREAM" key="title" />
        </Head>
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </>
);

export default IndexPage;
