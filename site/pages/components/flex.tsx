import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Flex from '@c8s/flex';
import Layer from '@c8s/layer';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Flex</Layer.heading>
        <Flex.column style={{color: '#393939'}}>
          <Flex.row>
            <Flex.itemFluid.row>
              <Flex.itemFluid.column>
                <Flex.row.center>item1-1</Flex.row.center>
                <Flex.row>item1-2</Flex.row>
              </Flex.itemFluid.column>
            </Flex.itemFluid.row>
            <Flex.item>item2</Flex.item>
          </Flex.row>
          <Flex.row>Flex</Flex.row>
        </Flex.column>
      </Layer>
    );
  };
} as any);
