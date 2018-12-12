import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section, Masonry} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/table';

  Main = () => (
    <Main title="Masonry">
      <div>
        <Masonry>
          {({Item}) => {
            return (
              <>
                {Array(50)
                  .fill(undefined)
                  .map((_item, i) => {
                    return (
                      <Item key={i}>
                        <div
                          style={{
                            background: '#444',
                            width: Math.random() * 400 + 200,
                            height: Math.random() * 400 + 200,
                          }}
                        />
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
