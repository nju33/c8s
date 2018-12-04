import React from 'react';
import {Box, Title} from '../atoms';

interface MainDefaultProps {
  title?: string;
}

export class Default extends React.PureComponent<MainDefaultProps> {
  render() {
    return (
      <Box>
        <Title>{this.props.title}</Title>
        {this.props.children}
      </Box>
    );
  }
}
