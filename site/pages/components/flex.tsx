import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Flex from '@c8s/flex';
import Layer from '@c8s/layer';
import Table from '@c8s/table';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Flex</Layer.heading>
        <div>
          <Flex.column.$>
            <Flex.item.$>Flex.row</Flex.item.$>
          </Flex.column.$>
        </div>

        <Layer>
          <Layer.heading>Props</Layer.heading>

          <Table head={['PropName', 'Type']} body={[]} />
        </Layer>
      </Layer>
    );
  };
} as any);
