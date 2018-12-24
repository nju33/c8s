import React from 'react';
import Flex from '@c8s/flex';
import {Separator} from '../atoms';

export interface BreadcrumbProps {
  items: React.ReactNode[];
}

export class Breadcrumb extends React.PureComponent<BreadcrumbProps> {
  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];

    return (
      <Flex.row.centerLeft>
        {children.map((item, i) => {
          return (
            <>
              {i === 0 ? '' : <Separator />}
              {item}
            </>
          );
        })}
      </Flex.row.centerLeft>
    );
  }
}
