import Document, { Html, Head, Main, DocumentContext, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          {/* ie 에서도 돌아갈 수 있도록 polyfill을 설정해준다. */}
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2018%2Ces2017%2Ces2019" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
