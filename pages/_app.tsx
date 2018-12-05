import React from 'react';
import App, {Container} from 'next/app';
import {ThemeProvider, ThemeContext} from '../components';
import {createGlobalStyle} from '../components/styled';
// tslint:disable-next-line:no-import-side-effect
import 'normalize.css';
import {theme, slackTheme} from '../helpers';
import {withRouter} from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Sawarabi Gothic";
    color: ${theme.get('TextColor')};
  }

  a {
    color: ${theme.get('ActivePresence')};
    text-decoration: none;
  }

  code {
    background: ${theme.get('HoverItem')};
    padding: .2em .5em;
    border-radius: ${theme.borderRadius};
    color: ${theme.get('ActiveItem')}
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
        '#ffffff,#e8e8e8,#5eabcc,#ffffff,#e8e8e8,#393939,#1BA1E6,#cc5e74',
      );
    };

    render() {
      const {Component, pageProps} = this.props;

      return (
        <Container>
          <ThemeProvider theme={this.getTheme()}>
            <ThemeContext.Provider value={this.getTheme()}>
              <>
                <GlobalStyle />
                <Component {...pageProps} />
              </>
            </ThemeContext.Provider>
          </ThemeProvider>
        </Container>
      );
    }
  },
);
