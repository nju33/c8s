import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section, Masonry} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/table';

  items = Array(50)
    .fill(undefined)
    .map(() => {
      return {
        background: '#444',
        width: Math.random() * 400 + 200,
        height: Math.random() * 400 + 200,
      };
    });

  Main = () => (
    <Main title="Masonry">
      <div>
        <Masonry>
          {({Item}) => {
            return (
              <>
                {this.items.map((style, i) => {
                  return (
                    <Item key={i} col={Math.random() > 0.8 ? 2 : 1}>
                      <div style={style} />
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
