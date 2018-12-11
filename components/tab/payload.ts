import React from 'react';

export interface FunctionsContext {
  onTabClick(label: string | number): () => void;
}

export interface PropsContext {
  labels: (string | number)[];
  initialLabel?: string | number;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export interface StateContext {
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
