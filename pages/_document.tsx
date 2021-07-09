import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
