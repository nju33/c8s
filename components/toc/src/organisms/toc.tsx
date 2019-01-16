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
  Component: React.ComponentType<P>
) => (props: P, idx: number) => JSX.Element;

// tslint:disable-next-line:no-typeof-undefined
const isServer = () => typeof window === 'undefined';

// tslint:disable-next-line:no-unnecessary-class
export class Toc {
  static provider = Provider;
  static consumer = TocContext.Consumer;

  private intersectionObserver: IntersectionObserver = isServer()
    ? (undefined as any)
    : new IntersectionObserver(entries => {
        const items = [...this.observer('items')];
        entries.forEach(entry => {
          const {target, intersectionRatio} = entry;

          for (const item of items) {
            if (target.id !== item.title.replace(/\s/g, '_')) {
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

  add = memoizee(
    (idx: number) => (
      props: TocItemRequiredProps & TocItemPrivateProps
    ): void => {
      const items = [...this.observer('items')];
      items[idx] = props;
      this.observer('items', items);
    }
  );

  remove = memoizee((idx: number) => (): void => {
    const items = [...this.observer('items')];
    items.splice(idx, 1);
    this.observer('items', items);
  });

  private use = memoizee((idx: number) => {
    return [this.add(idx), this.remove(idx)];
  });

  reset(): void {
    this.observer('items', []);
  }

  bind = memoizee<TocBindFn<TocItemProps<any>>>(
    Component => (props: TocItemProps<any>, idx: number) => {
      const intersectionObserver = this.intersectionObserver;
      const [add, remove] = this.use(idx);

      const TocComponent = class extends React.PureComponent {
        static displayName = `Toc#from(${Component.displayName})`;

        private ariaRef = React.createRef<any>();
        private elementId = props.title.replace(/\s/g, '_');

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
                behavior: 'smooth'
              });

              const re = /#.*/;
              if (re.test(location.href)) {
                history.replaceState(
                  {},
                  document.title,
                  location.href.replace(re, `#${this.elementId}`)
                );
              } else {
                history.replaceState(
                  {},
                  document.title,
                  `${location.href}#${this.elementId}`
                );
              }
            }
          });

          if (this.ariaRef.current === null) {
            return;
          }

          this.ariaRef.current.setAttribute('id', this.elementId);
          if (!isServer()) {
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
    }
  );
}
