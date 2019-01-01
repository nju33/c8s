import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
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
        <Layer.heading>Table</Layer.heading>
        <Table
          head={['foo', 'bar', 'baz']}
          body={[[1, 2, 3], ['hoge', 'fuga', 'piyo']]}
        />
      </Layer>
    );
  };
} as any);
