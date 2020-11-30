import Head from 'next/head';
import Link from 'next/link';

const IndexPage = () => (
    <>
        <Head>
            <title>My page title</title>
            <meta property="og:title" content="My page title" key="title" />
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
