import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Tab, CodeBlock, Section, Table} from '../../components';
import {DefaultTemplate} from '../../templates';
import {Panel} from '../../components/tab/organisms';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/tab';

  Main = () => (
    <Main title="Tab">
      <div>
        <Tab>
          <Panel label="foo">
            <div>
              <div>foo</div>
              <div>bar</div>
              <div>baz</div>
            </div>
          </Panel>
          <Panel label="bar">
            <div>
              <div>hoge</div>
              <div>fuga</div>
              <div>piyo</div>
            </div>
          </Panel>
        </Tab>
      </div>

      <Section title="Code">
        <CodeBlock lang="ts">
          {`
class Example extends React.Component {
  render() {
    return (
      <Tab>
        <Panel label="foo">
          <div>
            <div>foo</div>
            <div>bar</div>
            <div>baz</div>
          </div>
        </Panel>
        <Panel label="bar">
          <div>
            <div>hoge</div>
            <div>fuga</div>
            <div>piyo</div>
          </div>
        </Panel>
      </Tab>
    );
  }
}
`}
        </CodeBlock>
      </Section>
      <Section title="Props">
        <h3>Panel</h3>
        <Table
          head={['PropName', 'Type']}
          body={[
            [<code>label</code>, <code>string</code>],
            [<code>children</code>, <code>string</code>],
          ]}
        />
      </Section>
    </Main>
  );
} as any);
