import React from 'react';

export interface FunctionsContext {
  onTabClick(value: number | string): () => void;
}

// export interface TabItem {
//   label: string | number;
//   panel: React.ReactNode;
// }

export interface PropsContext {
  initialHead?: string | number;
  // items: TabItem[];
}

export interface StateContext {
  labels: (string | number)[];
  current: string | number;
}

export interface PayloadContext {
  functions: FunctionsContext;
  props: PropsContext;
  readonly state: StateContext;
}

export const Payload = React.createContext<PayloadContext>({
  functions: {
    onTabClick() {
      throw new Error('not implement');
    },
  },
} as any);
