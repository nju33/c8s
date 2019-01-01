import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Pager from '@c8s/pager';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Pager</Layer.heading>
        <Pager>
          <a href="#">{'<'}</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a>3</a>
          <a href="#">{'>'}</a>
        </Pager>
      </Layer>
    );
  };
} as any);
