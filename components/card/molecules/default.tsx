import React from 'react';
import {Box, Image, Content, A, Title} from '../atoms';

export interface CardMoleculeDefaultProps {
  image?: string;
  title?: string;
  link?: string;
  linkText?: string;
}

export class Default extends React.PureComponent<CardMoleculeDefaultProps> {
  render() {
    return (
      <Box>
        <Image src={this.props.image} />
        <Content>
          <Title>{this.props.title}</Title>
          {this.props.children}
        </Content>
        <div style={{textAlign: 'center'}}>
          <A href={this.props.link}>{this.props.linkText}</A>
        </div>
      </Box>
    );
  }
}
