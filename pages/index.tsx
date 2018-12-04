import React from 'react';
import {DefaultTemplate} from '../templates';
import {Main} from '../components';
import readme from '../README.md';

export default class extends DefaultTemplate {
  Main = () => (
    <Main>
      {
        // tslint:disable-next-line:react-no-dangerous-html
        <div dangerouslySetInnerHTML={{__html: readme as string}} />
      }
    </Main>
  );
}
