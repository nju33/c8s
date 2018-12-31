import React from 'react';
import {Box, Separator} from '../atoms';
import {Img} from './img';

export interface CardProps {
  image?: string;
  title?: string;
  link?: string;
  linkText?: string;
  style?: Partial<CSSStyleDeclaration>;
}

export class Card extends React.PureComponent<CardProps> {
  static box = Box;
  static img = Img;
  static separator = Separator;

  static defaultProps = {
    style: {},
  };

  render() {
    return <Box style={this.props.style as any}>{this.props.children}</Box>;
  }
}
