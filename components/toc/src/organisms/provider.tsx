import React from 'react';
import {Toc} from './toc';
import TocContext from '../context';

export interface TocProviderProps {
  toc: Toc;
}

export class Provider extends React.PureComponent<TocProviderProps> {
  static displayName = 'TocProvider';

  constructor(props: TocProviderProps) {
    super(props);

    props.toc.observer('items', items => {
      console.log(items.map(item => item.selected));
      this.forceUpdate();
    });
  }

  render() {
    return (
      <TocContext.Provider value={{items: this.props.toc.observer('items')}}>
        {this.props.children}
      </TocContext.Provider>
    );
  }
}
