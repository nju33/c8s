import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Tab} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/tab';

  Main = () => (
    <Main title="Tab">
      <div>
        <Tab
          items={[
            {
              label: 'foo',
              panel: (
                <div>
                  <div>foo</div>
                  <div>bar</div>
                  <div>baz</div>
                </div>
              ),
            },
            {
              label: 'bar',
              panel: (
                <div>
                  <div>hoge</div>
                  <div>fuga</div>
                  <div>piyo</div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </Main>
  );
} as any);
