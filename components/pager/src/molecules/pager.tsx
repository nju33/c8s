import React from 'react';
import Flex from '@nju33/react-flex';
import {Bowl} from '../atoms';

export interface PagerProps {
  // items: React.ReactNode[];
}

export class Pager extends React.PureComponent<PagerProps> {
  render() {
    return (
      <Flex inline>
        {this.props.items.map(item => {
          return <Bowl>{item}</Bowl>;
        })}
      </Flex>
    );
  }
}
