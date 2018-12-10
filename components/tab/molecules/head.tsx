import React from 'react';
import Flex from '@nju33/react-flex';
import {Switch} from '../atoms';
import {Payload} from '../payload';

export class Head extends React.PureComponent {
  render() {
    return (
      <Payload.Consumer>
        {({functions: {onTabClick}, state: {labels, current}}) => {
          return (
            <Flex style={{minHeight: 33.333}}>
              {labels.map((label, i) => {
                return (
                  <Switch
                    key={i}
                    aria-selected={current === label}
                    onClick={onTabClick(label)}
                  >
                    {label}
                  </Switch>
                );
              })}
            </Flex>
          );
        }}
      </Payload.Consumer>
    );
  }
}
