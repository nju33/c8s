import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Section, Table, Youtube, CodeBlock} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/pagination';

  Main = () => (
    <Main title="Youtube">
      <div>
        <Youtube videoId="psQkDS3zqRg" />
      </div>

      <Section title="Code">
        <CodeBlock lang="ts">
          {`
class Example extends React.Component {
  render() {
    return <Youtube videoId="psQkDS3zqRg" />
  }
}
`}
        </CodeBlock>
      </Section>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[[<code>videoId</code>, <code>string</code>]]}
        />
      </Section>
    </Main>
  );
} as any);
