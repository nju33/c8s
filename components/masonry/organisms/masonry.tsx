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

  boxRef: React.RefObject<HTMLDivElement>;
  state = produce(d => d)({
    init: false,
    stack: [],
    items: [],
  });

  apportion = () => {
    console.log(13213);
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

    // this.setState(
    //   produce<MasonryState>(draft => {
    //     draft.init = true;
    //   }),
    // );
  }

  render() {
    return (
      <PayloadContext.Provider
        value={{
          functions: {
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
