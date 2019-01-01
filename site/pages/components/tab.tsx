import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Tab from '@c8s/tab';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Tab</Layer.heading>
        <Tab labels={['foo', 'bar']} position="top">
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
      </Layer>
    );
  };
} as any);
