import React from 'react';
import {DefaultTemplate} from '../templates';
// import readme from '../../README.md';

export default class extends DefaultTemplate {
  Main = () => (
    <>
      {
        // tslint:disable-next-line:react-no-dangerous-html
        // <div dangerouslySetInnerHTML={{__html: readme as string}} />
        // tslint:disable-next-line:react-no-dangerous-html
        <div dangerouslySetInnerHTML={{__html: '<h1>Components</h1>'}} />
      }
    </>
  );
}
