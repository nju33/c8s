import React from 'react';
import {Head} from '../molecules';
import produce from 'immer';
import {
  Payload,
  StateContext,
  FunctionsContext,
  PropsContext,
} from '../payload';
import {Panel} from './panel';

export interface Children {
  children(Components: {Panel: typeof Panel}): JSX.Element | JSX.Element[];
}

export class Default extends React.Component<
  PropsContext & Children,
  StateContext
> {
  constructor(props: PropsContext & Children) {
    super(props);

    this.state = produce(d => d)({
      labels: [],
      current: '',
    });
  }

  addLabel: FunctionsContext['addLabel'] = (label, defaultSelected) => {
    this.setState(
      produce<StateContext>(draft => {
        draft.labels.push(label);
        if (defaultSelected) {
          draft.current = label;
        }
      }),
    );
  };

  onTabClick: FunctionsContext['onTabClick'] = value => () => {
    this.setState(
      produce<StateContext>(draft => {
        draft.current = value;
      }),
    );
  };

  render() {
    return (
      <Payload.Provider
        value={{
          functions: {
            addLabel: this.addLabel,
            onTabClick: this.onTabClick,
          },
          props: this.props,
          state: this.state,
        }}
      >
        <div>
          <Head />
          {this.props.children({Panel})}
        </div>
      </Payload.Provider>
    );
  }
}
