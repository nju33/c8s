import React from 'react';

const TocContext = React.createContext({});

export interface TocHocProps {
  toc: any;
}

// tslint:disable-next-line:no-unnecessary-class
export class Toc {
  static provider = TocContext.Provider;
  static consumer = TocContext.Consumer;

  static use<P extends Partial<TocHocProps>>(
    Component: React.SFC<P>,
  ): React.SFC<P> {
    return props => <Component {...props} />;
  }
}

interface AProps {
  foo: string;
}

const A: React.SFC<Partial<TocHocProps> & AProps> = () => <></>;
console.log(<A foo="a" />);

const TocA = Toc.use(A);
console.log(<TocA foo="a" />)
