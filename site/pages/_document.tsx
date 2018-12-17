import React from 'react';
import {ServerStyleSheet} from 'styled-components';
import Document, {Head, Main, NextScript} from 'next/document';

export default class IDocument extends Document<{styleTags: string}> {
  static getInitialProps({renderPage}: {renderPage: any}) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();

    return {...page, styleTags};
  }

  render() {
    return (
      <html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
