import React from 'react';
import {Toc, TocItemProps} from './toc';

test('types', () => {
  const AComponent: React.SFC<TocItemProps<HTMLDivElement>> = props => {
    return (
      <div ref={props.ariaRef} style={{paddingBottom: 1000}}>
        {props.title}
      </div>
    );
  };
  class BComponent extends React.Component<TocItemProps<HTMLDivElement>> {
    render() {
      return (
        <div ref={this.props.ariaRef} style={{paddingBottom: 1000}}>
          {this.props.title}
        </div>
      );
    }
  }
  const toc = new Toc();

  const list = [{title: 'foo'}, {title: 'bar'}, {title: 'baz'}];

  console.log(<div>{list.map(toc.bind(AComponent))}</div>);
  console.log(<div>{list.map(toc.bind(BComponent))}</div>);
});
