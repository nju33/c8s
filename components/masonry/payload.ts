import React from 'react';

export interface MasonryFunctions {
  apportion(): void;
}

export interface MasonryProps {
  col?: number;
  children(Components: {
    Item: React.MemoExoticComponent<React.SFC<{}>>;
  }): JSX.Element;
}

export interface MasonryState {
  init: boolean;
  stack: any[];
  items: any[];
}

export interface MasonryPayload {
  functions: MasonryFunctions;
  props: MasonryProps;
  state: MasonryState;
}

export const PayloadContext = React.createContext<MasonryPayload>({
  apportion() {
    throw new Error('no implement');
  },
} as any);
