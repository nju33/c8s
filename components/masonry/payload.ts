import React from 'react';
import {MasonryItemComponent, MasonryItemProps} from './organisms/item';

export interface MasonryFunctions {
  register(component: MasonryItemComponent): void;
  apportion(component: MasonryItemComponent): void;
}

export interface MasonryProps {
  col?: number;
  gutter?: number;
  children(Components: {
    Item: React.ExoticComponent<MasonryItemProps>;
  }): JSX.Element;
}

export interface ComponentItem {
  component: MasonryItemComponent;
  ready: boolean;
  stackIndex: number;
  position?: {
    left: number;
    top: number;
  };
}

export enum MasonryStackItemType {
  Empty,
  Gutter,
  Component,
}

export interface MasonryEmptyStackItem {
  type: MasonryStackItemType.Empty;
  height: number;
}

export interface MasonryGutterStackItem {
  type: MasonryStackItemType.Gutter;
}

export interface MasonryComponentStackItem {
  type: MasonryStackItemType.Component;
  height: number;
}

export type MasonryStackItem =
  | MasonryEmptyStackItem
  | MasonryGutterStackItem
  | MasonryComponentStackItem;

export interface MasonryState {
  col: number;
  gutter: number;
  boxHeight: number;
  queue: (() => void)[];
  rerun: boolean;
  sizes: number[];
  ready: boolean;
  refresh: boolean;
  componentItems: ComponentItem[];
  stacks: any[][];
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
