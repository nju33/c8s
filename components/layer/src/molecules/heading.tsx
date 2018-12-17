import React from 'react';
import {PayloadContext} from '../payload';
import {H} from '../atoms';
import styled from '@c8s/theme';

export const Heading: React.SFC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...headlingProps
}) => {
  return (
    <PayloadContext.Consumer>
      {({level}) => {
        if (level > 6) {
          return (
            <H
              {...headlingProps}
              role="heading"
              aria-label={(level as unknown) as string}
            >
              {children}
            </H>
          );
        }

        const tagName = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        const Component = styled(H.withComponent(tagName))``;
        return <Component {...headlingProps}>{children}</Component>;
      }}
    </PayloadContext.Consumer>
  );
};
