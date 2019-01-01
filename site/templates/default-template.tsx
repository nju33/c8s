import React from 'react';
import Head from 'next/head';
import Flex from '@nju33/react-flex';
import Sidebar from '../components/sidebar';
import { Main } from '../components/layout';

export abstract class DefaultTemplate<P = {}, S = {}> extends React.Component<
  P,
  S
> {
  abstract Main(): JSX.Element;

  render() {
    return (
      <>
        <Head>
          <title>Summary Components</title>
        </Head>
        <Flex>
          <Flex item={0}>
            <Sidebar
              items={[
                'Breadcrumb',
                'Button',
                'Card',
                'Form',
                'Flex',
                'Layer',
                'Masonry',
                'Pager',
                'Sidebar',
                'Slider',
                'Stripe',
                'Tab',
                'Table',
                'Youtube',
              ]}
            />
          </Flex>
          <Flex item={1}>
            <Main>
              <this.Main />
            </Main>
          </Flex>
        </Flex>
      </>
    );
  }
}
