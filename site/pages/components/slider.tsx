import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Slider, Section, Table} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/stripe';

  Main = () => (
    <Main title="Slider">
      <div>
        <Slider
          // length={3}
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
      </div>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[[<code>apiKey</code>, <code>string</code>]]}
        />
      </Section>
    </Main>
  );
} as any);
