import React from 'react';
import Link from 'next/link';
import qs from 'query-string';
import {Box, List} from '../atoms';
import {Logo} from '../../logo';

export class Default extends React.PureComponent<{items: string[]}> {
  static defaultProps = {
    items: [] as string[],
  };

  getQuery() {
    // tslint:disable-next-line:no-typeof-undefined
    return typeof window === 'undefined' ? {} : qs.parse(location.search);
  }

  render() {
    return (
      <Box>
        <Link
          prefetch
          href={{
            pathname: '/',
            query: this.getQuery(),
          }}
        >
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
                    query: this.getQuery(),
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
