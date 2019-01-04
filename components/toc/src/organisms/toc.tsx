import React from 'react';
import memoizee from 'memoizee';

const TocContext = React.createContext({});

export interface TocHocProps {
  toc: any;
}

// tslint:disable-next-line:no-empty-interface
export interface TocItem {}

// tslint:disable-next-line:no-unnecessary-class
export class Toc {
  static provider = TocContext.Provider;
  static consumer = TocContext.Consumer;

  private items: any[] = [];

  add = memoizee((idx: number) => () => {
    return idx;
  });

  with(elements: React.ReactElement<any>[]) {
    return elements.map((element, idx) => {
      React.cloneElement(element, {
        toc: {
          add: this.add(idx),
        },
      });
    });
  }
}

interface AProps {
  foo: string;
}

const A: React.SFC<Partial<TocHocProps> & AProps> = () => <></>;
console.log(<A foo="a" />);

const TocA = Toc.use(A);
console.log(<TocA foo="a" />);
