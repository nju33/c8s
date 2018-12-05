import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/breadcrumb';

  Main = () => (
    <Main title="Breadcrumb">
      <div>
        wip
      </div>
    </Main>
  );
} as any);
