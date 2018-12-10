import React from 'react';

export interface TabPanelProps {
  label: string | number;
}

export class Panel extends React.Component<TabPanelProps> {


  render() {
    return this.props.children;
  }
}
