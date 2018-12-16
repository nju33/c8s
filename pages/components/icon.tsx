import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main} from '../../components';
import {DefaultTemplate} from '../../templates';
// @ts-ignore
import {Facebook, Twitter, Hatena} from '../../components/icons';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/icon';

  Main = () => (
    <Main title="Icon">
      <div>
        <Facebook />
        <Hatena />
        <Twitter />
      </div>
    </Main>
  );
} as any);
