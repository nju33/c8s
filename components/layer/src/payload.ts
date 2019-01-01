import React from 'react';

export interface PayloadContextValue {
  level: number;
}

export const PayloadContext = React.createContext<PayloadContextValue>({
  level: 0,
});
