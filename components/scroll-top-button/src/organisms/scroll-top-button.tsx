import React from 'react';
import {Button} from '../atoms';

export interface ScrollTopButtonProps {
  top: number;
}

export class ScrollTopButton extends React.PureComponent<
  Partial<ScrollTopButtonProps>
> {
  static defaultProps = {
    top: 0,
  };

  onClick = () => {
    // tslint:disable-next-line:no-non-null-assertion
    window.scrollTo({top: this.props!.top, behavior: 'smooth'});
  };

  render() {
    return <Button onClick={this.onClick} />;
  }
}
