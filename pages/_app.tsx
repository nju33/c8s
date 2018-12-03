import React from 'react';
import App, {Container} from 'next/app';
import {ThemeProvider} from '../components';
import {createGlobalStyle} from '../components/styled';
// tslint:disable-next-line:no-import-side-effect
import 'normalize.css';
import {theme, slackTheme} from '../helpers';
import {withRouter} from 'next/router';

const GlobalStyle = createGlobalStyle`
  a {
    color: ${theme.get('ActivePresence')};
    text-decoration: none;
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

    getTheme = () => {
      if (this.props.router.query.theme !== undefined) {
        return slackTheme.parse(this.props.router.query.theme);
      }

      return slackTheme.parse(
        '#393939,#606060,#5eabcc,#ffffff,#606060,#c2c2c2,#1BA1E6,#cc5e74',
      );
    };

    render() {
      const {Component, pageProps} = this.props;

      return (
        <Container>
          <ThemeProvider theme={this.getTheme()}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </ThemeProvider>
        </Container>
      );
    }
  },
);
