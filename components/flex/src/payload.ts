import React from 'react';

export const Payload = React.createContext<{props: {}; Component: any}>({
  props: {},
  Component() {
    throw new Error('no implement');
  },
});
