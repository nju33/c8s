import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Breadcrumb, Section, Table} from '../../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/breadcrumb';

  Main = () => (
    <Main title="Breadcrumb">
      <div>
        <Breadcrumb
          items={[<a href="/#foo">foo</a>, <a href="/#bar">bar</a>, <>baz</>]}
        />
      </div>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[[<code>items</code>, <code>React.ReactNode[]</code>]]}
        />
      </Section>
    </Main>
  );
} as any);
