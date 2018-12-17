import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import {Main, Table, Section, Card} from '../../components';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/card';

  Main = () => (
    <Main title="Card">
      <div>
        <Card>カードテキスト</Card>
      </div>

      <Section title="Card with the image">
        <Card image="https://placehold.jp/300x300.png">カードテキスト</Card>
      </Section>

      <Section title="Card with the link">
        <Card
          image="https://placehold.jp/300x300.png"
          link="https://example.com"
          linkText="詳細"
        >
          カードテキスト
        </Card>
      </Section>

      <Section title="Card with the title">
        <Card
          image="https://placehold.jp/300x300.png"
          title="とあるカード"
          link="https://example.com"
          linkText="詳細"
        >
          カードテキスト
        </Card>
      </Section>

      <Section title="Props">
        <Table
          head={['PropName', 'Type']}
          body={[
            [<code>image</code>, <code>string | undefined</code>],
            [<code>title</code>, <code>string | undefined</code>],
            [<code>link</code>, <code>string | undefined</code>],
            [<code>linkText</code>, <code>string | undefined</code>],
            [<code>children</code>, <code>React.ReactNode</code>],
          ]}
        />
      </Section>
    </Main>
  );
} as any);
