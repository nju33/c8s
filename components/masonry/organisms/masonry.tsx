import React from 'react';
import produce from 'immer';
import {
  PayloadContext,
  MasonryProps,
  MasonryState,
  MasonryFunctions,
} from '../payload';
import {Item, MasonryItemProps} from './item';

export class Masonry extends React.Component<MasonryProps, MasonryState>
  implements MasonryFunctions {
  static defaultProps = {
    col: 3,
  };

  boxRef = React.createRef<HTMLDivElement>();
  state = produce<MasonryState>(d => d as any)({
    sizes: Array(this.props.col + 1).map(() => 0),
    init: false,
    componentItems: [] as MasonryState['componentItems'],
    stacks: [...Array(this.props.col)].map(() => []),
    items: [],
  });

  componentDidUpdate(_prevProps: MasonryProps, prevState: MasonryState) {
    const notInitialized = !prevState.init;
    const hasComponents = this.state.componentItems.length > 0;
    const allReady = this.state.componentItems.every(item => item.ready);

    if (notInitialized && hasComponents && allReady) {
      this.setState(
        produce<MasonryState>(draft => {
          draft.init = true;
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

  private getMinimumStackIndex(componentProps: MasonryItemProps): number {
    const sizes = this.state.stacks.map(stack => stack.length);
    const sorted = sizes
      .map((size, idx) => [idx, size])
      .sort((a, b) => a[1] - b[1]);

    let targetIndex: number;
    let i = 0;
    while (targetIndex === undefined) {
      if (this.props.col - sorted[i][0] < componentProps.col) {
        i++;
      } else {
        targetIndex = sorted[i][0];
        break;
      }
    }

    return targetIndex;
  }

  private getHeight() {
    const sizes = this.state.stacks.map(stack => stack.length);
    return Math.max(...sizes);
  }

  apportion: MasonryFunctions['apportion'] = component => {
    this.setState(
      produce<MasonryState>(draft => {
        const targetIndex = draft.componentItems.findIndex(
          ({component: aComponent}) => aComponent === (component as any),
        );
        if (targetIndex === -1) {
          return;
        }

        const stackIndex = this.getMinimumStackIndex(component.props);
        console.log(stackIndex);
        const targetStack = draft.stacks[stackIndex];
        const currentHeight = targetStack.length;
        [...Array(component.props.col)].map((_, i) => {
          draft.stacks[stackIndex + i].splice(
            targetStack.length,
            0,
            ...[...Array(component.boxRef.current.clientHeight)].map(() => 1),
          );
        });
        // targetStack.splice(
        //   targetStack.length,
        //   0,
        //   ...[...Array(component.boxRef.current.clientHeight)].map(() => 1),
        // );

        draft.componentItems[targetIndex].ready = true;
        draft.componentItems[targetIndex].stackIndex = stackIndex;
        draft.componentItems[targetIndex].position = {
          left:
            (this.boxRef.current.clientWidth / 3) * stackIndex -
            1 +
            stackIndex * 10,
          top: currentHeight,
        };
      }),
    );
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
