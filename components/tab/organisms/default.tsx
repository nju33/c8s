import React from 'react';
import {Head} from '../molecules';
import produce from 'immer';
import {
  Payload,
  StateContext,
  FunctionsContext,
  PropsContext,
} from '../payload';

export class Default extends React.Component<PropsContext, StateContext> {
  constructor(props: PropsContext) {
    super(props);

    this.state = produce(d => d)({
      current: props.initialHead || props.items[0].label,
    });
  }

  onTabClick: FunctionsContext['onTabClick'] = value => () => {
    this.setState(
      produce<StateContext>(draft => {
        draft.current = value;
      }),
    );
  };

  private getCurrentPanel() {
    const target = this.props.items.find(
      item => item.label === this.state.current,
    );
    if (target === undefined) {
      throw new Error('target not found');
    }

    return target.panel;
  }

  render() {
    return (
      <Payload.Provider
        value={{
          functions: {
            onTabClick: this.onTabClick,
          },
          props: this.props,
          state: this.state,
        }}
      >
        <div>
          <Head />
          {this.getCurrentPanel()}
        </div>
      </Payload.Provider>
    );
  }
}
