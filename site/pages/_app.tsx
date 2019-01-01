import React from 'react';
import App, {Container} from 'next/app';
import {Theme, theme, createGlobalStyle} from '@c8s/theme';
// import {createGlobalStyle} from '@c8s/';
// tslint:disable-next-line:no-import-side-effect
import 'normalize.css';
import {withRouter} from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Sawarabi Gothic";
    color: #393939;
  }
`;

export default withRouter(
  class extends App<any> {
    static async getInitialProps({
      Component,
      // router,
      ctx,
    }: {
      Component: any;
      // router: any;
      ctx: any;
    }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return {pageProps};
    }

    render() {
      const {Component, pageProps} = this.props;

      return (
        <Container>
          <GlobalStyle />
          <Theme theme={theme}>
            <Component {...pageProps} />
          </Theme>
        </Container>
      );
    }
  },
);
