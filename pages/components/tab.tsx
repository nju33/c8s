import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Tab, CodeBlock, Section, Table} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/tab';

  Main = () => (
    <Main title="Tab">
      <div>
        <Tab labels={['foo', 'bar']}>
          {([FooPanel, BarPanel]) => {
            return (
              <>
                <FooPanel>
                  <div>
                    <div>foo</div>
                    <div>bar</div>
                    <div>baz</div>
                  </div>
                </FooPanel>
                <BarPanel>
                  <div>
                    <div>hoge</div>
                    <div>fuga</div>
                    <div>piyo</div>
                  </div>
                </BarPanel>
              </>
            );
          }}
        </Tab>
      </div>

      <Section title="Code">
        <CodeBlock lang="ts">
          {`
class Example extends React.Component {
  render() {
    return (
      <Tab labels={['foo', 'bar']}>
        {([FooPanel, BarPanel]) => {
          return (
            <>
              <FooPanel>
                <div>
                  <div>foo</div>
                  <div>bar</div>
                  <div>baz</div>
                </div>
              </FooPanel>
              <BarPanel>
                <div>
                  <div>hoge</div>
                  <div>fuga</div>
                  <div>piyo</div>
                </div>
              </BarPanel>
            </>
          );
        }}
      </Tab>
    );
  }
}
`}
        </CodeBlock>
      </Section>
      <Section title="Props">
        <h3>Tab</h3>
        <Table
          head={['PropName', 'Type']}
          body={[
            [<code>labels</code>, <code>(string | number)[]</code>],
            [
              <code>initialLabel</code>,
              <code>undefined | string | number</code>,
            ],
            [
              <code>children</code>,
              <code>{'(Components: JSX.Element[]) => JSX.Element'}</code>,
            ],
          ]}
        />
        <h3>Panel</h3>
        <Table head={['PropName', 'Type']} body={[]} />
      </Section>
    </Main>
  );
} as any);
