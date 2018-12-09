import React from 'react';
import produce from 'immer';
import {throttle} from 'throttle-debounce';
import {
  SliderMoleculeDefaultProps,
  Default as DefaultMolecule,
  SliderState,
} from '../molecules';
import {createCycle, Cycle} from '../cycle';

export interface SliderOrganismDefaultProps {
  length?: number;
}

export const Default = class extends React.Component<
  SliderMoleculeDefaultProps & Required<SliderOrganismDefaultProps>,
  SliderState
> {
  static defaultProps = {
    length: 2,
  };

  constructor(
    props: SliderMoleculeDefaultProps & Required<SliderOrganismDefaultProps>,
  ) {
    super(props);

    const cycle = createCycle();

    this.state = produce(d => d)({
      cycle,
      step: cycle.next(),
      current: 0,
      items: props.items.slice(0, props.length),
      beforeTransitioning: false,
      transitioning: false,
      afterTransitioning: false,
      initTransition: false,
    });
  }

  private getItems() {
    console.log(
      this.state.current + this.props.items.length,
      this.props.items.length + this.props.items.length,
    )
    return [
      ...this.props.items,
      ...this.props.items,
      ...this.props.items,
    ].slice(
      this.state.current + this.props.items.length,
      this.state.current + this.props.items.length + this.props.items.length,
    );
  }

  private getPrevItem() {
    const prevIndex = this.state.current - 1;
    if (prevIndex < 0) {
      return this.props.items[this.props.items.length - 1];
    }

    return this.props.items[prevIndex];
  }

  private getNextItem() {
    const nextIndex = this.state.current + 1;
    if (nextIndex < 0) {
      return this.props.items[this.props.items.length + this.state.current];
    }

    if (nextIndex >= this.props.items.length) {
      return this.props.items[0];
    }

    return this.props.items[nextIndex];
  }

  private completeInitTransition() {
    this.setState(
      produce<SliderState>(draft => {
        draft.step = this.state.cycle.next();
      }),
    );
  }

  onLeftPagerClick = throttle(100, () => {
    this.setState(
      produce<SliderState>(draft => {
        draft.current--;
        if (Math.abs(draft.current) > this.props.items.length - 1) {
          draft.current = 0;
        }
        draft.dir = 'left';
        draft.step = this.state.cycle.next();
      }),
    );

    setTimeout(() => {
      this.completeInitTransition();
    }, 0);
  });

  onRightPagerClick = throttle(100, () => {
    this.setState(
      produce<SliderState>(draft => {
        draft.current++;
        if (draft.current > this.props.items.length - 1) {
          draft.current = 0;
        }
        draft.dir = 'right';
        draft.step = this.state.cycle.next();
      }),
    );

    setTimeout(() => {
      this.completeInitTransition();
    }, 0);
  });

  onTransitionEnd = (ev: React.SyntheticEvent<HTMLUListElement>) => {
    if (
      ev.currentTarget.getAttribute('data-current-step-is') !== Cycle.Process
    ) {
      return;
    }

    this.setState(
      produce<SliderState>(draft => {
        delete draft.dir;
        draft.step = this.state.cycle.next();
      }),
    );
  };

  // shouldComponentUpdate(_, prevState) {
  //   return prevState.cycle.value !== this.state.cycle.value;
  // }

  render() {
    // console.log(this.state);
    return (
      <DefaultMolecule
        width={this.props.width}
        length={this.props.length}
        items={(() => {
          const items = this.getItems();
          console.log(items)
          const slicedItems = items.slice(0, this.props.length);
          console.log(slicedItems);
          if (
            this.state.cycle.value === Cycle.Prepare ||
            this.state.cycle.value === Cycle.Process
          ) {
            if (this.state.dir === 'left') {
              return [...slicedItems, this.getNextItem()];
            }

            return [this.getPrevItem(), ...slicedItems];
          }

          return slicedItems;
        })()}
        initTransition={this.state.initTransition}
        step={this.state.cycle.value}
        dir={this.state.dir}
        current={this.state.current}
        left={this.state.left}
        onLeftPagerClick={this.onLeftPagerClick}
        onRightPagerClick={this.onRightPagerClick}
        onTransitionEnd={this.onTransitionEnd}
      />
    );
  }
} as React.ComponentClass<
  SliderMoleculeDefaultProps & SliderOrganismDefaultProps
>;
