import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Slider from '@c8s/slider';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Slider</Layer.heading>
        <Slider
          items={[
            {
              image: 'https://via.placeholder.com/600x480',
              text: 'Lorem ipsum dolor1',
            },
            {
              image: 'https://via.placeholder.com/500x480',
              text: 'Lorem ipsum dolor2',
            },
            {
              image: 'https://via.placeholder.com/700x480',
              text: 'Lorem ipsum dolor3',
            },
          ]}
        />
      </Layer>
    );
  };
} as any);
