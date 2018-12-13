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
  state = produce<MasonryState>(d => d)({
    width: 0,
    height: 0,
    init: false,
    componentItems: [] as MasonryState['componentItems'],
    stack: [],
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
        draft.componentItems.push({component, ready: false});
      }),
    );
  };

  apportion: MasonryFunctions['apportion'] = component => {
    this.setState(
      produce<MasonryState>(draft => {
        const targetIndex = draft.componentItems.findIndex(
          ({component: aComponent}) => aComponent === component,
        );
        if (targetIndex === -1) {
          return;
        }

        draft.componentItems[targetIndex].ready = true;
      }),
    );
  };

  componentDidMount() {
    this.setState(
      produce<MasonryState>(draft => {
        draft.stack = [];
        for (let i = 0; i < this.props.col; i++) {
          draft.stack.push({});
        }
      }),
    );

    setTimeout(() => {
      console.log(this.state);
    }, 1000);
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
        <div ref={this.boxRef}>{this.props.children({Item})}</div>
      </PayloadContext.Provider>
    );
  }
}
