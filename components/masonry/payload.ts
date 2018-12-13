import React from 'react';
import {MasonryItemComponent, MasonryItemProps} from './organisms/item';

export interface MasonryFunctions {
  register(component: MasonryItemComponent): void;
  apportion(component: MasonryItemComponent): void;
}

export interface MasonryProps {
  col?: number;
  children(Components: {
    Item: React.ExoticComponent<MasonryItemProps>;
  }): JSX.Element;
}

export interface ComponentItem {
  // component: MasonryItemComponent;
  component: any;
  ready: boolean;
}

export interface MasonryState {
  width: number;
  height: number;
  init: boolean;
  componentItems: ComponentItem[];
  stack: any[];
  items: any[];
}

export interface MasonryPayload {
  functions: MasonryFunctions;
  props: MasonryProps;
  state: MasonryState;
}

export const PayloadContext = React.createContext<MasonryPayload>({
  register() {
    throw new Error('`register` do not implement');
  },
  apportion() {
    throw new Error('`apportion` do not implement');
  },
} as any);
