import React from 'react';
import produce from 'immer';
import PQueue from 'p-queue';
// import corcer from 'corcer';
import {corcer} from './corcer';
import {
  PayloadContext,
  MasonryProps,
  MasonryState,
  MasonryFunctions,
} from '../payload';
import {Item} from './item';

export class Masonry extends React.Component<MasonryProps, MasonryState>
  implements MasonryFunctions {
  static defaultProps = {
    col: 3,
  };

  boxRef = React.createRef<HTMLDivElement>();
  state: MasonryState = produce<MasonryState>(d => d as any)({
    queue: new PQueue({concurrency: 1}),
    sizes: Array(this.props.col + 1).map(() => 0),
    ready: false,
    componentItems: [] as MasonryState['componentItems'],
    stacks: [...Array(this.props.col)].map(() => []),
    items: [],
  });

  shouldComponentUpdate(_, nextState: MasonryState) {
    return nextState.componentItems.every(item => item.ready);
  }

  componentDidUpdate(_prevProps: MasonryProps, prevState: MasonryState) {
    const notReady = !prevState.ready;
    const hasComponentItems = this.state.componentItems.length > 0;
    const allReady = this.state.componentItems.every(item => item.ready);

    if (notReady && hasComponentItems && allReady) {
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
        draft.componentItems.push({
          component: component as any,
          ready: false,
          stackIndex: -1,
          position: {left: -1, top: -1},
        });
      }),
    );
  };

  private getMinimumStackIndex(): number {
    const sizes = this.state.stacks.map(stack => stack.length);
    const minSize = Math.min(...sizes);

    return sizes.indexOf(minSize);
  }

  private getHeight() {
    const sizes = this.state.stacks.map(stack => stack.length);
    return Math.max(...sizes);
  }

  apportion: MasonryFunctions['apportion'] = component => {
    if (component.boxRef.current === null) {
      return;
    }

    this.state.queue.add(() => {
      const componentWidth = component.boxRef.current.clientWidth;
      const componentHeight = component.boxRef.current.clientHeight;
      const stacks = this.state.stacks.map(stack => {
        return [...stack, ...[...Array(componentHeight)].map(() => 0)];
      });
      console.log(component, stacks);

      this.setState(
        produce<MasonryState>(draft => {
          const targetIndex = draft.componentItems.findIndex(
            ({component: aComponent}) => aComponent === (component as any),
          );
          if (targetIndex === -1) {
            return;
          }

          const dough = corcer(stacks);
          const position: any = (() => {
            let x = 0;
            let y = 0;

            /**
             * ■ ■
             * ■
             * ■
             * ■
             * ---
             * ■ ■ ■ ■ → (1)
             * ■
             * ↓ (2)
             */
            while (y < stacks[x].length) {
              while (x < stacks.length - (component.props.col - 1)) {
                const part = dough(y, x, componentHeight, component.props.col);

                if (
                  part.test(
                    [...Array(component.props.col)].map(() => {
                      return [...Array(componentHeight)].map(() => 0);
                    }),
                  )
                ) {
                  console.log('#', {x: y, y: x}, stacks, part.matrix);
                }

                if (
                  part.test(
                    [...Array(component.props.col)].map(() => {
                      return [...Array(componentHeight)].map(() => 0);
                    }),
                  )
                ) {
                  return {x, y};
                }
                x++;
              }
              x = 0;
              y++;
            }
          })();

          if (position === undefined) {
            throw new Error('><');
          }
          console.log('position', position);

          (() => {
            let v = position.x;
            const maxV = v + component.props.col;
            let w = position.y;
            const maxW = w + componentHeight;

            while (v < maxV) {
              while (w < maxW) {
                console.log('v', v);
                stacks[v][w] = 1;
                w++;
              }
              v++;
            }
          })();

          draft.stacks = stacks;

          draft.componentItems[targetIndex].ready = true;
          draft.componentItems[targetIndex].stackIndex = position.y;
          draft.componentItems[targetIndex].position = {
            left: (componentWidth / 3) * position.x - 1 + position.x * 10,
            top: position.y,
          };
        }),
      );
    });
  };

  componentDidMount() {
    const width = this.boxRef.current.clientWidth;

    this.setState(
      produce<MasonryState>(draft => {
        draft.sizes = [...Array(this.props.col + 1)].map((_, i) => {
          if (i === 0) {
            return 0;
          }

          return (width / this.props.col) * i + (i * 10 - 1);
        });
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
          style={{position: 'relative', height: this.getHeight()}}
        >
          {this.props.children({Item})}
        </div>
      </PayloadContext.Provider>
    );
  }
}
