import React from 'react';
import styled from 'styled-components';

export const Styled = styled<any>(({Component, className, children}) => {
  return <Component {...{className, children}} />;
});
