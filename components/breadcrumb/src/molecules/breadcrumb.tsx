import React from 'react';
import Flex from '@c8s/flex';
import {Separator, Container} from '../atoms';

export interface BreadcrumbProps {
  children: React.ReactNode | React.ReactNode[];
}

export class Breadcrumb extends React.PureComponent<BreadcrumbProps> {
  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];

    return (
      <Container>
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
      </Container>
    );
  }
}
