import React from 'react';
import {Switch, Box} from '../atoms';
import {Payload} from '../payload';

export class Head extends React.PureComponent {
  render() {
    return (
      <Payload.Consumer>
        {({
          functions: {onTabClick},
          props: {position, labels},
          state: {current},
        }) => {
          return (
            <Box data-position={position || 'left'} data-ref="molecules/head">
              {labels.map((label, i) => {
                return (
                  <Switch
                    key={i}
                    data-position={position || 'left'}
                    aria-selected={current === label}
                    onClick={onTabClick(label)}
                  >
                    {label}
                  </Switch>
                );
              })}
            </Box>
          );
        }}
      </Payload.Consumer>
    );
  }
}
