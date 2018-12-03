import React from 'react';
import Link from 'next/link';
import {Box, List} from '../atoms';
import {Logo} from '../../logo';

export class Default extends React.PureComponent<{items: string[]}> {
  static defaultProps = {
    items: [] as string[],
  };

  render() {
    return (
      <Box>
        <Link prefetch href={{pathname: '/'}}>
          <a style={{display: 'block'}}>
            <Logo />
          </a>
        </Link>
        <List>
          {this.props.items.map(item => {
            return (
              <li key={item}>
                <Link
                  prefetch
                  href={{
                    pathname: `/components/${item.toLocaleLowerCase()}`,
                  }}
                >
                  <a>{item}</a>
                </Link>
              </li>
            );
          })}
        </List>
      </Box>
    );
  }
}
