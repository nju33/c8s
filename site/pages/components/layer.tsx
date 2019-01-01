import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Table from '@c8s/table';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>,
  {
    col: number;
    gutter: number;
  }
> {
  static displayName = '/pages/components/table';

  constructor(props: any) {
    super(props);

    this.state = {
      col: 3,
      gutter: 10,
    };
  }

  incrementCol = () => {
    this.setState({
      col: this.state.col + 1,
    });
  };

  decrementCol = () => {
    this.setState({
      col: this.state.col - 1,
    });
  };

  incrementGutter = () => {
    this.setState({
      gutter: this.state.gutter + 1,
    });
  };

  decrementGutter = () => {
    this.setState({
      gutter: this.state.gutter - 1,
    });
  };

  Main = () => (
    <Layer>
      <Layer.heading>Layer</Layer.heading>

      <div>
        <Layer>
          <Layer.heading>H2</Layer.heading>
          <Layer>
            <Layer.heading>H3</Layer.heading>
            <Layer>
              <Layer.heading>H4</Layer.heading>
              <Layer>
                <Layer.heading>H5</Layer.heading>
                <Layer>
                  <Layer.heading>H6</Layer.heading>
                  <Layer>
                    <Layer.heading>H7</Layer.heading>
                    <Layer>
                      <Layer.heading>H8</Layer.heading>
                      <Layer>
                        <Layer.heading>H9</Layer.heading>
                      </Layer>
                    </Layer>
                  </Layer>
                </Layer>
              </Layer>
            </Layer>
          </Layer>
        </Layer>
      </div>

      <Layer>
        <Layer.heading>Props</Layer.heading>

        <Table head={['PropName', 'Type']} body={[]} />
      </Layer>
    </Layer>
  );
} as any);
