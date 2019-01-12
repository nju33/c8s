import React from 'react';
import {PayloadContext} from '../payload';

export const Heading: React.SFC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...headlingProps
}) => {
  return (
    <PayloadContext.Consumer>
      {({level}) => {
        if (level > 6) {
          return (
            <div {...headlingProps} role="heading" aria-level={level}>
              {children}
            </div>
          );
        }
        const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        return <Tag {...headlingProps}>{children}</Tag>;
      }}
    </PayloadContext.Consumer>
  );
};
