import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/form';

  Main = () => (
    <Main title="Form">
      <div>
        wip
      </div>
    </Main>
  );
} as any);
