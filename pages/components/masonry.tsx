import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section, Masonry} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/table';

  // items = Array(50)
  // items = Array(3)
  //   .fill(undefined)
  //   .map(() => {
  //     return {
  //       background: '#444',
  //       width: Math.random() * 400 + 200,
  //       height: Math.random() * 400 + 200,
  //     };
  //   });

  items = [
    {
      background: 'orange',
      width: 300,
      height: 300,
    },
    {
      background: 'gray',
      width: 300,
      height: 300,
    },
    {
      background: 'purple',
      width: 300,
      height: 300,
    },
    {
      background: 'orange',
      width: 300,
      height: 300,
    },
    {
      background: '#444',
      width: 300,
      height: 300,
    },
    {
      background: '#222',
      width: 300,
      height: 300,
    },
  ];

  Main = () => (
    <Main title="Masonry">
      <div>
        <Masonry>
          {({Item}) => {
            return (
              <>
                {this.items.map((style, i) => {
                  return (
                    <Item
                      key={i}
                      assets={[
                        {
                          href: `https://dummyimage.com/${style.width}x${
                            style.height
                          }`,
                          as: 'image',
                        },
                      ]}
                      col={Math.random() > 0.3 ? 2 : 1}
                    >
                      <div style={{...style, maxWidth: '100%'}} />
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
