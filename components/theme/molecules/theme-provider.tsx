import React from 'react';
import {
  ThemeProvider as StyledThemeProvider,
  ThemeInterface,
} from '../../styled';

export class ThemeProvider extends React.PureComponent<{
  children: JSX.Element;
  theme: ThemeInterface;
}> {
  render() {
    return (
      <StyledThemeProvider theme={this.props.theme}>
        {this.props.children}
      </StyledThemeProvider>
    );
  }
}
