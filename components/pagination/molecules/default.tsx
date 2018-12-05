import React from 'react';
import Flex from '@nju33/react-flex';
import {Bowl} from '../atoms';

export interface BreadcrumbMoleculeDefaultProps {
  items: React.ReactNode[];
}

export class Default extends React.PureComponent<
  BreadcrumbMoleculeDefaultProps
> {
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
