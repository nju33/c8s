import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Stripe} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = 'Components.stripe';

  Main = () => (
    <Main title="Stripe">
      <div>
        <Stripe apiKey="pk_test_VxoRAVbeCW8oobWvQzI43Dzl" />
      </div>
    </Main>
  );
} as any);
