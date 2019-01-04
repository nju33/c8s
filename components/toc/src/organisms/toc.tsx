import React from 'react';
import memoizee from 'memoizee';

const TocContext = React.createContext({});

export interface TocHocProps {
  toc: any;
}

// tslint:disable-next-line:no-empty-interface
export interface TocItemProps {
  title: string;
}

export type TocBindFn<P = {}> = (
  Component: React.ComponentType<P>,
) => (props: P & TocItemProps, idx: number) => JSX.Element;

// tslint:disable-next-line:no-unnecessary-class
export class Toc<P = {}> {
  static provider = TocContext.Provider;
  static consumer = TocContext.Consumer;

  private items: any[] = [];

  private add = memoizee((idx: number) => (props: TocItemProps): void => {
    this.items[idx] = props;
    console.log(this);
  });

  private remove = memoizee((idx: number) => (): void => {
    this.items.splice(idx, 1);
  });

  private use = memoizee((idx: number) => {
    return [this.add(idx), this.remove(idx)];
  });

  bind = memoizee<TocBindFn<P>>(
    Component => (props: P & TocItemProps, idx: number) => {
      const [add, remove] = this.use(idx);

      const TocComponent = class extends React.PureComponent {
        static displayName = `Toc#from(${Component.displayName})`;

        componentDidMount() {
          add(props);
        }

        componentWillUnmount() {
          remove(props);
        }

        render() {
          return <Component {...props as any} />;
        }
      };
      return <TocComponent key={props.title} />;
    },
  );
}
