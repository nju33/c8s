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
        <Tab />
      </div>
    </Main>
  );
} as any);
