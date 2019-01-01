import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
// import Stripe from '@c8s/stripe';
import {DefaultTemplate} from '../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Stripe</Layer.heading>
        {/* <Stripe apiKey="xxxx" /> */}
      </Layer>
    );
  };
} as any);
