import React from 'react';
import Flex from '@nju33/react-flex';
import {Switch} from '../atoms';

export class Head extends React.PureComponent {
  render() {
    return (
      <Flex>
        <Switch aria-selected={true}>1</Switch>
        <Switch aria-selected={false}>2</Switch>
      </Flex>
    );
  }
}
