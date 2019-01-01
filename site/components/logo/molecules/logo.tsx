import React from 'react';
import logo from '../logo.svg';
import Flex from '@nju33/react-flex';

export class Logo extends React.PureComponent {
  render() {
    return (
      <Flex className="center" style={{height: 100}}>
        <img src={logo} style={{width: 150}} />
      </Flex>
    );
  }
}
