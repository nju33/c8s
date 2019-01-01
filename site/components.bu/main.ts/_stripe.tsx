import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Stripe, Section, Table} from '../../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/stripe';

  Main = () => (
    <Main title="Stripe">
      <div>
        <Stripe apiKey="pk_test_VxoRAVbeCW8oobWvQzI43Dzl" />
      </div>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[[<code>apiKey</code>, <code>string</code>]]}
        />
      </Section>
    </Main>
  );
} as any);
