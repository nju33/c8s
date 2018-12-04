import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Button, Main} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = 'Components.Button';

  Main = () => (
    <Main title="Button">
      <div>
        <Button>button</Button>
      </div>
    </Main>
  );
} as any);
