import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Button, Main, Section, Table} from '../../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/button';

  Main = () => (
    <Main title="Button">
      <div>
        <Button>button</Button>
      </div>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[[<code>children</code>, <code>string</code>]]}
        />
      </Section>
    </Main>
  );
} as any);
