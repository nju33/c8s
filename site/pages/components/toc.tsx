import React from 'react';
import {withRouter, WithRouterProps} from 'next/router';
import Layer from '@c8s/layer';
import Toc, {TocItemProps} from '@c8s/toc';
import {DefaultTemplate} from '../../templates';

export default withRouter(class extends DefaultTemplate<
  WithRouterProps<{name: string}>
> {
  static displayName = '/pages/components/toc';

  Main = () => {
    const toc = new Toc();
    const AComponent: React.SFC<TocItemProps<HTMLDivElement>> = props => {
      return (
        <div ref={props.ariaRef} style={{paddingBottom: 1000}}>
          {props.title}
        </div>
      );
    };
    const list = [{title: 'foo'}, {title: 'bar'}, {title: 'baz'}];

    return (
      <Layer>
        <Layer.heading>Toc</Layer.heading>
        <Toc.provider toc={toc}>
          <>
            <ul style={{position: 'fixed', top: 50, right: 50, width: 100}}>
              <Toc.consumer>
                {({items}) => {
                  return items.map(item => {
                    return (
                      <li
                        key={item.title}
                        style={{
                          color: item.selected ? 'orange' : 'inherit',
                        }}
                        onClick={item.scroll}
                      >
                        {item.title}
                      </li>
                    );
                  });
                }}
              </Toc.consumer>
            </ul>
          </>
          <div>{list.map(toc.bind(AComponent))}</div>
        </Toc.provider>
      </Layer>
    );
  };
} as any);
