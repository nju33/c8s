import React from 'react';
import {ThemeContext} from '../theme-context';
import {createGlobalStyle, ThemeProvider} from '../styled-components';
import {ThemeValues} from '../theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-size: 14.5px;
    line-height: 1.5;
  }
`;

export const Theme = React.memo<{theme: ThemeValues}>(({children, theme}) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
      </ThemeProvider>
    </>
  );
});
