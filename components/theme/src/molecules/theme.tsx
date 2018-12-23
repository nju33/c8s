import React from 'react';
import {ThemeContext} from '../theme-context';
import {ThemeProvider} from '../styled-components';
import {ThemeValues} from '../theme';

export const Theme = React.memo<{theme: ThemeValues}>(({children, theme}) => {
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
});
