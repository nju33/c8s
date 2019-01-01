import React from 'react';
import Flex from '@c8s/flex';
import {Bowl} from '../atoms';

export interface PagerProps {
  children: React.ReactNode[];
}

export class Pager extends React.PureComponent<PagerProps> {
  render() {
    return (
      <Flex.row.center>
        {this.props.children.map(child => {
          return <Bowl>{child}</Bowl>;
        })}
      </Flex.row.center>
    );
  }
}
