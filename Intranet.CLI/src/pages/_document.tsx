// carregado uma única vez
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="modalContainer" />
                </body>
            </Html>
        )
    }
}

