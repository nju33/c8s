import React from 'react';
import produce from 'immer';
import {MasonryPayload, PayloadContext} from '../payload';

export interface MasonryItemProps {
  col: number;
  payload: MasonryPayload;
}

export interface MasonryItemState {
  init: boolean;
}

export type MasonryItemComponent = React.Component<
  MasonryItemProps,
  MasonryItemState
> & {boxRef: React.RefObject<HTMLDivElement>};

export class Original extends React.PureComponent<
  MasonryItemProps,
  MasonryItemState
> {
  static displayName = 'Original(MasonryItem)';

  boxRef = React.createRef<HTMLDivElement>();
  state = produce(d => d)({
    init: false,
  });

  constructor(props: MasonryItemProps) {
    super(props);

    props.payload.functions.register(this);
  }

  componentDidMount() {
    this.props.payload.functions.apportion(this);
  }

  render() {
    if (!this.props.payload.state.init) {
      return (
        <div ref={this.boxRef} data-col={this.props.col} style={{opacity: 0.1}}>
          {this.props.children}
        </div>
      );
    }

    return (
      <div ref={this.boxRef} data-col={this.props.col}>
        {this.props.children}
      </div>
    );
  }
}

const Item = React.memo(props => {
  return (
    <PayloadContext.Consumer>
      {payload => {
        return <Original payload={payload} {...props} />;
      }}
    </PayloadContext.Consumer>
  );
});
Item.displayName = 'MasonryItem';

export {Item};
