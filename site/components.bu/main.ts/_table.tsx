import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section} from '../../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/table';

  Main = () => (
    <Main title="Table">
      <div>
        <Table
          head={['foo', 'bar', 'baz']}
          body={[[1, 2, 3], ['hoge', 'fuga', 'piyo']]}
        />
      </div>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[
            [<code>head</code>, <code>(string | number | JSX.Element)[]</code>],
            [<code>body</code>, <code>(string | number | JSX.Element)[]</code>],
          ]}
        />
      </Section>
    </Main>
  );
} as any);
