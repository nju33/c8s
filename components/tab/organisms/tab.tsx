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
import {Box} from '../atoms';

export interface Children {
  children(
    Components: React.NamedExoticComponent<{
      children: JSX.Element | JSX.Element[];
    }>[],
  ): JSX.Element;
}

export class Tab extends React.Component<
  PropsContext & Children,
  StateContext
> {
  state = produce(d => d)({
    current: this.props.initialLabel || this.props.labels[0],
  });

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
            onTabClick: this.onTabClick,
          },
          props: this.props,
          state: this.state,
        }}
      >
        <Box
          data-position={this.props.position || 'top'}
          data-ref="organisms/tab"
        >
          <Head />
          {this.props.children(
            this.props.labels.map(label => {
              const APanel = React.memo(props => {
                return <Panel label={label}>{props.children}</Panel>;
              });
              APanel.displayName = `Panel(${label})`;
              return APanel;
            }),
          )}
        </Box>
      </Payload.Provider>
    );
  }
}
