import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section, Masonry} from '../../components';
import {DefaultTemplate} from '../../templates';
import randomcolor from 'randomcolor';

const createItem = (_: any, i: number) => {
  const col = i % 5 === 1 ? 2 : 1;
  return {
    col,
    style: {
      background: randomcolor({
        luminosity: 'dark',
      }),
      width: col * 300,
      height: col * 300,
    },
  };
};

const items = [...Array(20)].map(createItem);

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
    <Main title="Masonry">
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
                          href: `https://dummyimage.com/${style.style.width}x${
                            style.style.height
                          }`,
                          as: 'image',
                        },
                      ]}
                      index={i}
                      col={style.col}
                    >
                      <div style={{...style.style, maxWidth: '100%'}} />
                    </Item>
                  );
                })}
              </>
            );
          }}
        </Masonry>
      </div>

      <Section title="Props">
        <Table head={['PropName', 'Type']} body={[]} />
      </Section>
    </Main>
  );
} as any);
