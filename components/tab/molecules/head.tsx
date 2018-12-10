import React from 'react';
import Flex from '@nju33/react-flex';
import {Switch} from '../atoms';
import {Payload} from '../payload';

export class Head extends React.PureComponent {
  render() {
    return (
      <Payload.Consumer>
        {({functions: {onTabClick}, props: {items}, state: {current}}) => {
          return (
            <Flex>
              {items.map((item, i) => {
                return (
                  <Switch
                    key={i}
                    aria-selected={current === item.label}
                    onClick={onTabClick(item.label)}
                  >
                    {item.label}
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
