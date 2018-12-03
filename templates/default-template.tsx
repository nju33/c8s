import React from 'react';
import Head from 'next/head';
import Flex from '@nju33/react-flex';

export abstract class DefaultTemplate<P = {}, S = {}> extends React.Component<
  P,
  S
> {
  abstract Sidebar(): JSX.Element;
  abstract Main(): JSX.Element;

  render() {
    return (
      <>
        <Head>
          <title>Summary Components</title>
        </Head>
        <Flex>
          <Flex item={0}>
            <this.Sidebar />
          </Flex>
          <Flex item={1}>
            <this.Main />
          </Flex>
        </Flex>
      </>
    );
  }
}
