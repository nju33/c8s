import React from 'react';
import memoizee from 'memoizee';
import gsw from 'gsw';
import {Provider} from './provider';
import TocContext from '../context';

export interface TocHocProps {
  toc: any;
}

// tslint:disable-next-line:no-empty-interface
export interface TocItemRequiredProps {
  title: string;
}

export interface TocItemPrivateProps {
  selected: boolean;
  scroll(): void;
}

export interface TocItemOptionalProps<E extends HTMLElement> {
  ariaRef: React.RefObject<E>;
}

export type TocItemProps<E extends HTMLElement> = TocItemRequiredProps &
  Partial<TocItemOptionalProps<E>>;

export type TocBindFn<P extends TocItemProps<HTMLElement>> = (
  Component: React.ComponentType<P>,
) => (props: P, idx: number) => JSX.Element;

// tslint:disable-next-line:no-unnecessary-class
export class Toc {
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
  observer = gsw({items: [] as (TocItemRequiredProps & TocItemPrivateProps)[]});

  private add = memoizee(
    (idx: number) => (
      props: TocItemRequiredProps & TocItemPrivateProps,
    ): void => {
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

  bind = memoizee<TocBindFn<TocItemProps<any>>>(
    Component => (props: TocItemProps<any>, idx: number) => {
      const intersectionObserver = this.intersectionObserver;
      const [add, remove] = this.use(idx);

      const TocComponent = class extends React.PureComponent {
        static displayName = `Toc#from(${Component.displayName})`;

        private ariaRef = React.createRef<any>();

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

const AComponent: React.SFC<TocItemProps<HTMLDivElement>> = props => {
  return (
    <div ref={props.ariaRef} style={{paddingBottom: 1000}}>
      {props.title}
    </div>
  );
};
const toc = new Toc();

const list = [{title: 'foo'}, {title: 'bar'}, {title: 'baz'}];

console.log(<div>{list.map(toc.bind(AComponent))}</div>);
