import styled from '@c8s/theme';
import vwxy from 'vwxy';

const hoverItem = vwxy().theme.hoverItem();
const borderRadius = vwxy().theme.borderRadius();
const transitionDuration = vwxy().theme.transitionDuration();


export const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  transition: ${transitionDuration};
  margin-top: 1em;
  border: 1px solid ${hoverItem};
  font-size: 0.9em;
  border-radius: ${borderRadius};
  position: relative;
`;