import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Pagination, Section, Table} from '../../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/pagination';

  Main = () => (
    <Main title="Pagination">
      <div>
        <Pagination
          items={[
            <a href="/#1" style={{color: '#fff'}}>1</a>,
            <a href="/#2" style={{color: '#fff'}}>2</a>,
            <a href="/#3" style={{color: '#fff'}}>3</a>,
          ]}
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
