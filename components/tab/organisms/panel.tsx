import React from 'react';
import {
  Payload,
  FunctionsContext,
  StateContext,
  PropsContext,
} from '../payload';

export interface TabPanelProps {
  label: string | number;
  defaultSelected?: boolean;
}

const Original = class extends React.Component<
  Required<TabPanelProps> & {
    functions: FunctionsContext;
    props: PropsContext;
    state: StateContext;
  }
> {
  static defaultProps = {
    defaultSelected: false,
  };

  constructor(
    props: Required<TabPanelProps> & {
      functions: FunctionsContext;
      props: PropsContext;
      state: StateContext;
    },
  ) {
    super(props);

    props.functions.addLabel(props.label, props.defaultSelected);
  }

  render() {
    if (this.props.state.current !== this.props.label) {
      return null;
    }
    return this.props.children;
  }
};

export const Panel = React.memo<TabPanelProps>(props => {
  return (
    <Payload.Consumer>
      {payload => {
        return <Original {...props} {...payload} />;
      }}
    </Payload.Consumer>
  );
});
