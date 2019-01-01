import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Card from '@c8s/card';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/flex';

  Main = () => {
    return (
      <Layer>
        <Layer.heading>Card</Layer.heading>
        <Layer>
          <Layer.heading>1.</Layer.heading>
          <Card style={{width: 200, height: 200}}>
            <Card.img src="https://placehold.jp/200x200.png">
              <div role="heading">タイトル</div>
              <div style={{fontSize: 13}}>
                ほげほげふがふが
                <br />
                ほげほげふがふが
              </div>
            </Card.img>
          </Card>
        </Layer>

        <Layer>
          <Layer.heading>2.</Layer.heading>
          <Card>
            <Card.img src="https://placehold.jp/200x200.png" />
            <div>
              <div role="heading">タイトル</div>
              <div style={{fontSize: 13}}>
                ほげほげふがふが
                <br />
                ほげほげふがふが
              </div>
            </div>
          </Card>
        </Layer>

        <Layer>
          <Layer.heading>3.</Layer.heading>
          <Card>
            <a href="#">
              <Card.img src="https://placehold.jp/200x200.png" />
              <div>
                <div role="heading">タイトル</div>
                <Card.separator />
                <div style={{fontSize: 13}}>
                  ほげほげふがふが
                  <br />
                  ほげほげふがふが
                </div>
              </div>
            </a>
          </Card>
        </Layer>
      </Layer>
    );
  };
} as any);
