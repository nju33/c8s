import React from 'react';
import memoizee from 'memoizee';
import gsw from 'gsw';
import {Provider} from './provider';
import TocContext from '../context';

export interface TocHocProps {
  toc: any;
}

// tslint:disable-next-line:no-empty-interface
export interface TocItemProps {
  title: string;
}

export interface TocItemPrivateProps {
  selected: boolean;
  scroll(): void;
}

export interface TocItemPrivateOptionalProps {
  ariaRef: React.RefObject<HTMLElement>;
}

export type TocBindFn<P = {}> = (
  Component: React.ComponentType<P>,
) => (props: P & TocItemProps, idx: number) => JSX.Element;

// tslint:disable-next-line:no-unnecessary-class
export class Toc<P = {}> {
  static provider = Provider;
  static consumer = TocContext.Consumer;

  private intersectionObserver = new IntersectionObserver(entries => {
    const items = [...this.observer('items')];
    entries.forEach(entry => {
      const {target, intersectionRatio} = entry;

      for (const item of items) {
        if (target.id !== item.title) {
          continue;
        }

        if (intersectionRatio === 0) {
          item.selected = false;
        } else {
          item.selected = true;
        }
        break;
      }
    });
    this.observer('items', items);
  });
  observer = gsw({items: [] as (TocItemProps & TocItemPrivateProps)[]});

  private add = memoizee(
    (idx: number) => (props: TocItemProps & TocItemPrivateProps): void => {
      const items = [...this.observer('items')];
      items[idx] = props;
      this.observer('items', items);
    },
  );

  private remove = memoizee((idx: number) => (): void => {
    const items = [...this.observer('items')];
    items.splice(idx, 1);
    this.observer('items', items);
  });

  private use = memoizee((idx: number) => {
    return [this.add(idx), this.remove(idx)];
  });

  bind = memoizee<TocBindFn<P>>(
    Component => (
      props: P & TocItemProps & Partial<TocItemPrivateOptionalProps>,
      idx: number,
    ) => {
      const intersectionObserver = this.intersectionObserver;
      const [add, remove] = this.use(idx);

      const TocComponent = class extends React.PureComponent {
        static displayName = `Toc#from(${Component.displayName})`;

        private ariaRef = React.createRef<HTMLElement>();

        constructor(thisProps: any) {
          super(thisProps);
        }

        componentDidMount() {
          add({
            ...props,
            selected: false,
            scroll: () => {
              const element = this.ariaRef.current;
              if (element === null) {
                return;
              }

              window.scrollTo({
                top: element.getBoundingClientRect().top + window.pageYOffset,
                behavior: 'smooth',
              });
            },
          });

          if (this.ariaRef.current !== null) {
            this.ariaRef.current.setAttribute('id', props.title);
            intersectionObserver.observe(this.ariaRef.current);
          }
        }

        componentWillUnmount() {
          // tslint:disable-next-line:no-empty
          remove({...props, selected: false, scroll() {}});
        }

        render() {
          return <Component {...props as any} ariaRef={this.ariaRef} />;
        }
      };
      return <TocComponent key={props.title} />;
    },
  );
}

// const toc = new Toc<{title: string; ariaRef?: React.RefObject<any>}>();
// const AComponent: React.SFC<{
//   title: string;
//   ariaRef?: React.RefObject<any>;
// }> = props => {
//   // tslint:disable-next-line:no-non-null-assertion
//   return <div ref={props.ariaRef!}>{props.title}</div>;
// };
// const list = [{title: 'foo'}, {title: 'bar'}, {title: 'baz'}];

// list.map(toc.bind(AComponent));
