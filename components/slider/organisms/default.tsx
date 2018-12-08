import React from 'react';
import produce from 'immer';
import {
  SliderMoleculeDefaultProps,
  Default as DefaultMolecule,
  SliderState,
} from '../molecules';

export class Default extends React.Component<
  SliderMoleculeDefaultProps,
  SliderState
> {
  constructor(props: SliderMoleculeDefaultProps) {
    super(props);

    this.state = produce(d => d)({
      current: 0,
      left: 0,
    });
  }

  getRepeatedItems = () => {
    if (this.props.items.length % 2 === 0) {
      return [...this.props.items, ...this.props.items, ...this.props.items];
    }

    return [
      this.props.items[this.props.items.length - 1],
      ...this.props.items,
      ...this.props.items,
      ...this.props.items,
    ];
  };

  onLeftPagerClick = () => {
    this.setState(
      produce<SliderState>(draft => {
        draft.current--;
        draft.left = 300 * data.current;
      }),
    );
  };

  onRightPagerClick = () => {
    this.setState(
      produce<SliderState>(draft => {
        draft.current++;
        draft.left = 300 * data.current;
      }),
    );
  };

  render() {
    console.log(this);
    return (
      <DefaultMolecule
        width={this.props.width}
        items={this.getRepeatedItems()}
        current={this.state.current}
        left={this.state.left}
        onLeftPagerClick={this.onLeftPagerClick}
        onRightPagerClick={this.onRightPagerClick}
      />
    );
  }
}
