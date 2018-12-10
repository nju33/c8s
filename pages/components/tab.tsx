import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Tab} from '../../components';
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
    </Main>
  );
} as any);
