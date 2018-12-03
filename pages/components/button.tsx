import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Button, Sidebar, Main} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = 'Components.Button';

  // @ts-ignore
  props: {
    router: {
      query: {
        name?: string;
      };
    };
  };

  Sidebar = () => <Sidebar items={['Button']} />;

  Main = () => (
    <Main>
      <h1>Button</h1>
      <div>
        <Button>button</Button>
      </div>
    </Main>
  );
} as any);
