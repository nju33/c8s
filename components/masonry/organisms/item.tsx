import React from 'react';
import produce from 'immer';
import {MasonryPayload, PayloadContext} from '../payload';

export interface MasonryItemState {
  init: boolean;
}

export class Original extends React.PureComponent<
  {payload: MasonryPayload},
  MasonryItemState
> {
  static displayName = 'Original(MasonryItem)';

  state = produce(d => d)({
    init: false,
  });

  componentDidMount() {
    this.setState(
      produce<MasonryItemState>(draft => {
        draft.init = true;
      }),
    );
  }

  render() {
    if (!this.state.init) {
      return <div style={{opacity: 0}}>{this.props.children}</div>;
    }

    return <div>{this.props.children}</div>;
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
