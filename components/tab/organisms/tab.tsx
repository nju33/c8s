import React from 'react';
import {Head} from '../molecules';
import produce from 'immer';
import {
  Payload,
  StateContext,
  FunctionsContext,
  PropsContext,
} from '../payload';

export interface Children {
  children: JSX.Element | JSX.Element[];
}

export class Default extends React.Component<
  PropsContext & Children,
  StateContext
> {
  constructor(props: PropsContext & Children) {
    super(props);

    let children: JSX.Element[];
    if (Array.isArray(props.children)) {
      children = props.children;
    } else {
      children = [props.children];
    }

    const labels = children.map((child: any) => {
      if (child.props.label === undefined) {
        throw new Error('label is required on Panel prop');
      }
      return child.props.label;
    });
    this.state = produce(d => d)({
      labels,
      current: props.initialHead || labels[0],
    });
  }

  onTabClick: FunctionsContext['onTabClick'] = value => () => {
    this.setState(
      produce<StateContext>(draft => {
        draft.current = value;
      }),
    );
  };

  private getChildren() {
    let children: JSX.Element[];
    if (Array.isArray(this.props.children)) {
      children = this.props.children as JSX.Element[];
    } else {
      children = [this.props.children] as JSX.Element[];
    }

    return children;
  }

  private getCurrentPanel() {
    const target = this.getChildren().find(
      child => child.props.label === this.state.current,
    );
    if (target === undefined) {
      throw new Error('target not found');
    }

    return target;
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
