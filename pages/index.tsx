import React from 'react';
import {DefaultTemplate} from '../templates';
import {Sidebar, Main} from '../components';
import readme from '../README.md';

export default class extends DefaultTemplate {
  Sidebar = () => <Sidebar items={['Button']} />;

  Main = () => (
    <Main>
      {
        // tslint:disable-next-line:react-no-dangerous-html
        <div dangerouslySetInnerHTML={{__html: readme as string}} />
      }
    </Main>
  );
}
