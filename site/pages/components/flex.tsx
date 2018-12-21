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
    // console.dir(new Flex().render());
    return (
      <Layer>
        <Layer.heading>Flex</Layer.heading>
        <div>
          <Flex>
            <div>Flex</div>
            <Flex.column>
              <Flex.row>
                <div>Flex.row1-1</div>
                <div>Flex.row1-2</div>
              </Flex.row>
              <Flex.row>
                <div>Flex.row2-1</div>
                <div>Flex.row2-2</div>
              </Flex.row>
            </Flex.column>
          </Flex>
            {/* aa */}
          {/* </Flex.row> */}
        </div>

        <Layer>
          <Layer.heading>Props</Layer.heading>

          <Table head={['PropName', 'Type']} body={[]} />
        </Layer>
      </Layer>
    );
  };
} as any);
