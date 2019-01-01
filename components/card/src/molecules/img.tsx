import React from 'react';
import {ImageBlock, Image} from '../atoms';

export interface ImgProps {
  src: string;
}

export class Img extends React.PureComponent<ImgProps> {
  render() {
    if (this.props.children !== undefined) {
      return (
        <ImageBlock data-image={this.props.src}>
          {this.props.children}
        </ImageBlock>
      );
    }

    return <Image src={this.props.src} />;
  }
}
