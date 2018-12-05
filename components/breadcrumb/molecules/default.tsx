import React from 'react';
import Flex from '@nju33/react-flex';
import {Separator} from '../atoms';

export interface BreadcrumbMoleculeDefaultProps {
  items: React.ReactNode[];
}

export class Default extends React.PureComponent<
  BreadcrumbMoleculeDefaultProps
> {
  render() {
    return (
      <Flex inline>
        {this.props.items.map((item, i) => {
          return (
            <>
              {i === 0 ? '' : <Separator />}
              {item}
            </>
          );
        })}
      </Flex>
    );
  }
}
