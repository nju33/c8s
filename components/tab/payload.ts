import React from 'react';

export interface FunctionsContext {
  addLabel(label: string | number, defaultSelected: boolean): void;
  onTabClick(label: string | number): () => void;
}

export interface PropsContext {
  initialLabel?: string | number;
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
