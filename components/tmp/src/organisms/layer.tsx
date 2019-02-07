import React from 'react';
import {PayloadContext} from '../payload';
import {Heading, Parallax} from '../molecules';

export class Layer extends React.Component {
  static heading = Heading;
  static parallax = Parallax;

  render() {
    return (
      <>
        <PayloadContext.Consumer>
          {({level}) => {
            return (
              <PayloadContext.Provider value={{level: level + 1}}>
                {this.props.children}
              </PayloadContext.Provider>
            );
          }}
        </PayloadContext.Consumer>
      </>
    );
  }
}
