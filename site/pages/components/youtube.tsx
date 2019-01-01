import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Youtube from '@c8s/youtube';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Youtube</Layer.heading>
        <Youtube
          videoId="psQkDS3zqRg"
          theme={{width: '50vw', height: '45vh'}}
        />
      </Layer>
    );
  };
} as any);
