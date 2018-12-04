import React from 'react';
import Head from 'next/head';
import Flex from '@nju33/react-flex';
import {Sidebar} from '../components';

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
            <Sidebar items={['Button', 'Stripe']} />
          </Flex>
          <Flex item={1}>
            <this.Main />
          </Flex>
        </Flex>
      </>
    );
  }
}
