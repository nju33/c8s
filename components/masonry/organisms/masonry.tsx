import React from 'react';
import {
  PayloadContext,
  MasonryProps,
  MasonryState,
  MasonryFunctions,
} from '../payload';
import {Item} from './item';
import produce from 'immer';

export class Masonry extends React.Component<MasonryProps, MasonryState>
  implements MasonryFunctions {
  static defaultProps = {
    col: 3,
  };

  boxRef = React.createRef<HTMLDivElement>();
  state = produce(d => d)({
    width: 0,
    height: 0,
    init: false,
    components: [],
    stack: [],
    items: [],
  });

  componentDidUpdate(_prevProps: MasonryProps, prevState: MasonryState) {
    const notInitialized = !prevState.init;
    const hasComponents = this.state.components.length > 0;
    const allReady = this.state.components.every(component => component.ready);

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

  register = (
    itemInstance: React.Component<{id: number}> & {
      boxRef: React.RefObject<any>;
    },
  ) => {
    this.setState(
      produce<MasonryState>(draft => {
        draft.components.push({item: itemInstance, ready: false});
      }),
    );
  };

  apportion = itemInstance => {
    this.setState(
      produce<MasonryState>(draft => {
        const targetIndex = draft.components.findIndex(
          component => component.item === itemInstance,
        );
        if (targetIndex === -1) {
          return;
        }

        draft.components[targetIndex].ready = true;
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
