import React from 'react';
import produce from 'immer';
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
  state = produce<MasonryState>(d => d as any)({
    width: 0,
    height: 0,
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

  private getMinimumStackIndex(): number {
    const sizes = this.state.stacks.map(stack => stack.length);
    const minSize = Math.min(...sizes);

    return sizes.findIndex(size => size === minSize);
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

        const stackIndex = this.getMinimumStackIndex();
        const targetStack = draft.stacks[stackIndex];
        const currentHeight = targetStack.length;
        targetStack.splice(
          targetStack.length,
          0,
          ...[...Array(component.boxRef.current.clientHeight)].map(() => 1),
        );

        draft.componentItems[targetIndex].ready = true;
        draft.componentItems[targetIndex].stackIndex = stackIndex;
        draft.componentItems[targetIndex].position = {
          left: (this.boxRef.current.clientWidth / 3) * stackIndex - 1,
          top: currentHeight,
        };
      }),
    );
  };

  // componentDidMount() {
  // }

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
        <div ref={this.boxRef} style={{position: 'relative'}}>
          {this.props.children({Item})}
        </div>
      </PayloadContext.Provider>
    );
  }
}
