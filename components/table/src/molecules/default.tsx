import React from 'react';
import {Table} from '../atoms';

export interface TableProps {
  head: (string | number | JSX.Element)[];
  body: (string | number | JSX.Element)[][];
}

export class Default extends React.PureComponent<TableProps> {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            {this.props.head.map((item, i) => {
              return <th key={i}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.props.body.map((items, i) => {
            return (
              <tr key={i}>
                {items.map((item, j) => {
                  return <td key={j}>{item}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
