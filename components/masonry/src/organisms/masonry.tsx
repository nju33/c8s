import React from 'react';
import produce from 'immer';
import Corcer from 'corcer';
import {
  PayloadContext,
  MasonryProps,
  MasonryState,
  MasonryFunctions,
} from '../payload';
import {Item} from './item';

export class Masonry extends React.Component<MasonryProps, MasonryState>
  implements MasonryFunctions {
  static getDerivedStateFromProps(
    nextProps: MasonryProps,
    prevState: MasonryState,
  ) {
    // tslint:disable:no-non-null-assertion
    const col = nextProps.col!;
    const gutter = nextProps.gutter!;
    // tslint:enable:no-non-null-assertion
    if (col !== prevState.col || gutter !== prevState.gutter) {
      return produce<MasonryState>(draft => {
        if (col !== prevState.col) {
          draft.col = col;
        } else if (gutter !== prevState.gutter) {
          draft.gutter = gutter;
        }
        draft.ready = false;
        draft.rerun = true;
        draft.refresh = true;
        draft.stacks = Array.from(Array(col)).map(() => []);
      })(prevState);
    }

    return null;
  }

  static defaultProps = {
    col: 3,
    gutter: 10,
  };

  boxRef = React.createRef<HTMLDivElement>();
  state: MasonryState = produce<MasonryState>(d => d as any)({
    queue: [],
    rerun: false,
    refresh: false,
    boxHeight: 0,
    // tslint:disable:no-non-null-assertion
    col: this.props.col!,
    gutter: this.props.gutter!,
    sizes: Array.from(Array(this.props.col! + 1)).map(() => 0),
    stacks: Array.from(Array(this.props.col!)).map(() => []),
    // tslint:enable:no-non-null-assertion
    ready: false,
    componentItems: [] as MasonryState['componentItems'],
  });

  shouldComponentUpdate(_: unknown, nextState: MasonryState) {
    return (
      (nextState.queue.every(Boolean) &&
        nextState.queue.length === this.state.componentItems.length) ||
      nextState.componentItems.every(item => item.ready) ||
      this.state.refresh !== nextState.refresh
    );
  }

  componentDidUpdate(_prevProps: MasonryProps, _prevState: MasonryState) {
    if (this.state.rerun) {
      this.setState(
        produce<MasonryState>(draft => {
          draft.sizes = this.getSizes();
          draft.ready = true;
          draft.rerun = false;
        }),
      );

      setTimeout(() => {
        this.state.queue.forEach((fn: any) => {
          fn();
        });

        setTimeout(() => {
          this.setState(
            produce<MasonryState>(draft => {
              draft.refresh = false;
            }),
          );
        }, 100);
      }, 0);
      return;
    }

    if (
      !this.state.ready &&
      this.state.queue.filter(Boolean).length ===
        this.state.componentItems.length
    ) {
      this.state.queue.forEach((fn: any) => {
        fn();
      });
      this.setState(
        produce<MasonryState>(draft => {
          draft.ready = true;
        }),
      );
      return;
    }

    return;
  }

  register: MasonryFunctions['register'] = component => {
    this.setState(
      produce<MasonryState>(draft => {
        draft.componentItems[component.props.index] = {
          component: component as any,
          ready: false,
          stackIndex: -1,
        };
      }),
    );
  };

  apportion: MasonryFunctions['apportion'] = component => {
    if (component.boxRef.current === null) {
      return;
    }
    const fn = () => {
      // tslint:disable:no-non-null-assertion
      const componentHeight = component.boxRef.current!.clientHeight;
      const componentCol = component.props.col!;
      // tslint:enable:no-non-null-assertion

      this.setState(
        produce<MasonryState>(draft => {
          const stacks = draft.stacks.map(stack => {
            return [
              ...stack,
              // tslint:disable-next-line:no-non-null-assertion
              ...Array.from(Array(componentHeight + this.props.gutter!)).map(
                () => 0,
              ),
            ];
          });
          const targetIndex = draft.componentItems.findIndex(
            ({component: aComponent}) => aComponent === (component as any),
          );
          if (targetIndex === -1) {
            return;
          }

          const corcer = new Corcer<number>(
            Corcer.transpose(Corcer.flat(stacks, 0)),
          );

          const part = corcer.search(
            Corcer.transpose(
              Array.from(Array(componentCol)).map(() =>
                // tslint:disable-next-line:no-non-null-assertion
                Array.from(Array(componentHeight + this.props.gutter!)).map(
                  () => 0,
                ),
              ),
            ),
          );

          if (part === undefined) {
            throw new Error('undefined');
          }

          draft.stacks = Corcer.transpose(part.replaceTo(1, corcer).matrix).map(
            line => {
              const reversedLine = line.reverse();
              const index = reversedLine.indexOf(1);
              if (index === -1) {
                return line;
              }

              return reversedLine.slice(index).reverse();
            },
          );

          // tslint:disable-next-line:no-non-null-assertion
          const {position} = part.ctx!;
          draft.componentItems[targetIndex].ready = true;
          draft.componentItems[targetIndex].stackIndex = position.x;
          const width =
            // tslint:disable-next-line:no-non-null-assertion
            this.boxRef.current!.clientWidth -
            (this.state.col - 1) * this.state.gutter;
          draft.componentItems[targetIndex].position = {
            left:
              // tslint:disable-next-line:no-non-null-assertion
              (width / this.state.col) * position.x +
              position.x * this.state.gutter,
            top: position.y,
          };

          if (component.props.index === draft.componentItems.length - 1) {
            draft.boxHeight = Math.max(
              ...draft.stacks.map(stack => stack.length),
            );
          }
          // tslint:enable:no-non-null-assertion
          return;
        }),
      );
    };

    this.setState(
      produce<MasonryState>(draft => {
        draft.queue[component.props.index] = fn;
      }),
    );
  };

  private getSizes() {
    const width =
      // tslint:disable-next-line:no-non-null-assertion
      this.boxRef.current!.clientWidth -
      (this.state.col - 1) * this.state.gutter;

    return Array.from(Array(this.state.col + 1)).map((_, i) => {
      if (i === 0) {
        return 0;
      }

      return (width / this.state.col) * i;
    });
  }

  componentDidMount() {
    this.setState(
      produce<MasonryState>(draft => {
        draft.sizes = this.getSizes();
      }),
    );
  }

  render() {
    return (
      <PayloadContext.Provider
        value={{
          functions: {
            register: this.register,
            apportion: this.apportion,
          },
          props: this.props,
          state: this.state,
        }}
      >
        <div
          ref={this.boxRef}
          style={{
            position: 'relative',
            height: this.state.boxHeight,
            overflow: 'hidden',
          }}
        >
          {this.props.children({Item})}
        </div>
      </PayloadContext.Provider>
    );
  }
}
