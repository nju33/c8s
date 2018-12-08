import React from 'react';
import {Row, Item, Image, Container, Pager} from '../atoms';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';

export interface SliderMoleculeDefaultProps {
  items: {
    image: string;
    text: string;
  }[];
  width: number;
}

export interface SliderState {
  current: number;
  left: number;
}

export interface SliderMoleculeDefaultHandlerProps {
  onLeftPagerClick(): void;
  onRightPagerClick(): void;
}

export class Default extends React.PureComponent<
  SliderMoleculeDefaultProps & SliderMoleculeDefaultHandlerProps & SliderState
> {
  render() {
    return (
      <Container>
        <Pager onClick={this.props.onLeftPagerClick}>
          <FaAngleLeft size={16} />
        </Pager>
        <Row>
          {this.props.items.map(item => {
            return (
              <Item>
                <Image src={item.image} />
                <div>{item.text}</div>
              </Item>
            );
          })}
        </Row>
        <Pager onClick={this.props.onRightPagerClick}>
          <FaAngleRight size={16} />
        </Pager>
      </Container>
    );
  }
}
