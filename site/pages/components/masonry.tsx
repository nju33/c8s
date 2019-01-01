import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import randomcolor from 'randomcolor';
import Masonry from '@c8s/masonry';
import Layer from '@c8s/layer';
import Table from '@c8s/table';
import {DefaultTemplate} from '../../templates';

const createItem = (_: any, i: number) => {
  const col = i % 5 === 1 ? 2 : 1;
  return {
    col,
    style: {
      background: randomcolor({
        luminosity: 'dark',
      }),
      // width: col * 300,
      // height: col * 300,
    },
  };
};

// const items = [...Array(3)].map(createItem);
const items = [...Array(10)].map(createItem);

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
      <Layer.heading>Masonry</Layer.heading>

      <div style={{marginBottom: '1em'}}>
        <button onClick={this.incrementCol}>列+</button>
        <button onClick={this.decrementCol}>列-</button>
        <button onClick={this.incrementGutter}>間+</button>
        <button onClick={this.decrementGutter}>間-</button>
      </div>
      <div>
        <Masonry col={this.state.col} gutter={this.state.gutter}>
          {({Item}) => {
            return (
              <>
                {items.map((style, i) => {
                  return (
                    <Item
                      key={i}
                      assets={[
                        {
                          href: `https://dummyimage.com/500x500`,
                          as: 'image',
                        },
                      ]}
                      index={i}
                      col={style.col}
                    >
                      <div style={{display: 'block'}}>
                        <img
                          src="https://dummyimage.com/500x500"
                          style={{
                            maxWidth: '100%',
                            display: 'block',
                          }}
                        />
                        <div
                          style={{
                            ...style.style,
                            maxWidth: '100%',
                            color: '#000',
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </div>
                      </div>
                    </Item>
                  );
                })}
              </>
            );
          }}
        </Masonry>
      </div>

      <Layer>
        <Layer.heading>Props</Layer.heading>

        <Table head={['PropName', 'Type']} body={[]} />
      </Layer>
    </Layer>
  );
} as any);
