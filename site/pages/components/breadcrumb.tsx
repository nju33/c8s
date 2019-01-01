import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Breadcrumb from '@c8s/breadcrumb';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Breadcrumb</Layer.heading>
        <Breadcrumb>
          <a href="#">foo</a>
          <a href="#">bar</a>
          <a>baz</a>
        </Breadcrumb>
      </Layer>
    );
  };
} as any);
