import React from 'react';
import {Box} from '../atoms';

export class Default extends React.PureComponent {
  render() {
    return <Box>{this.props.children}</Box>;
  }
}
