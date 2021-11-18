import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { MuiTheme } from '../MuiTheme';
import { GOOGLE_TRACKING_ID, APP_ENV, GOOGLE_API_KEY } from '../config';

type Props = {
  pageProps: any
};
class MyDocument extends Document<Props> {
  render(): JSX.Element {
    return (
      <Html style={{ fontSize: '62.5%' }}>
        <Head>
          <meta name="theme-color" content={MuiTheme.palette.primary.main} />
          <meta name="keywords" content="space, next, door" />
          <meta name="description" content="space next door" />
          <meta charSet="utf-8" />
          <script src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`} />
          {
            APP_ENV === 'prod'
            && (
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GOOGLE_TRACKING_ID}');
              `,
                }}
                defer
              />
            )
          }
        </Head>
        <body>
          {
            APP_ENV === 'prod'
            && (
              <noscript>
                <iframe
                  title="dd"
                  src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TRACKING_ID}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                />
              </noscript>
            )
          }
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default MyDocument;
