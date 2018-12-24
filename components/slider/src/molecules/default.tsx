import React from 'react';
import {Row, Item, Image, Container, Pager, Monitor, Cover} from '../atoms';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import {Cycle} from '../cycle';

// tslint:disable-next-line:no-empty
const noop = () => {};

export interface SliderMoleculeDefaultProps {
  items: {
    image: string;
    text: string;
  }[];
  width: number;
}

export interface SliderProps {
  length: number;
}

export interface SliderState {
  current: number;
  left: number;
}

export interface SliderMoleculeDefaultHandlerProps {
  onLeftPagerClick(): void;
  onRightPagerClick(): void;
  onTransitionEnd(): void;
}

export class Default extends React.PureComponent<
  SliderMoleculeDefaultProps &
    SliderMoleculeDefaultHandlerProps &
    SliderProps &
    SliderState
> {
  render() {
    return (
      <Container>
        <Pager
          {...{
            onClick:
              this.props.step === Cycle.Still
                ? this.props.onLeftPagerClick
                : noop,
          }}
        >
          <FaAngleLeft size={16} />
        </Pager>
        <Monitor>
          <Row
            className={[this.props.initTransition ? 'no-transition' : undefined]
              .filter(Boolean)
              .join(' ')}
            data-current-step-is={this.props.step}
            data-dir-is={this.props.dir}
            data-state-current={this.props.current}
            data-length={this.props.length}
            data-state-left={this.props.left}
            onTransitionEnd={this.props.onTransitionEnd}
          >
            {this.props.items.map(item => {
              return (
                <Item data-length={this.props.length}>
                  <Image src={item.image} />
                  <div>{item.text}</div>
                </Item>
              );
            })}
          </Row>
        </Monitor>
        <Pager
          {...{
            onClick:
              this.props.step === Cycle.Prepare ||
              this.props.state === Cycle.Process
                ? noop
                : this.props.onRightPagerClick,
          }}
        >
          <FaAngleRight size={16} />
        </Pager>
        <Cover aria-hidden={this.props.step === Cycle.Still} />
      </Container>
    );
  }
}
