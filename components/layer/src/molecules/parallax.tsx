import React from 'react';
import styled from '@c8s/theme';

export interface ParallaxProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children(Group: React.NamedExoticComponent<any>): JSX.Element;
}

const PERSPECTIVE = 300;

const Wall = React.memo<{level: number}>(props => {
  const level = props.level * 300;
  const scale = level / PERSPECTIVE + 1;
  const Div = styled.div({
    transform: `translateZ(${-level}px) scale(${scale})`,
    transformOrigin: 'center center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: props.level,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  });

  return <Div {...props} />;
});

const Group = React.memo<{
  children(Wall: React.NamedExoticComponent<{level: number}>): JSX.Element;
}>(({children, ...props}) => {
  const Div = styled.div({
    height: '100vh',
    width: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
  });

  return <Div {...props}>{children(Wall)}</Div>;
});

export const Parallax = React.memo<ParallaxProps>(({children, ...props}) => {
  const Div = styled.div({
    height: '100vh',
    perspective: PERSPECTIVE,
    overflowX: 'hidden',
    overflowY: 'auto',
  });

  return <Div {...props}>{children(Group)}</Div>;
});
