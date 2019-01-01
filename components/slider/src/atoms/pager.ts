import styled from '@c8s/theme';
import vwxy from 'vwxy';

const hoverItem = vwxy().theme.hoverItem();
const transitionDuration = vwxy().theme.transitionDuration();

export const Pager = styled.div`
  flex: 0;
  height: 16px;
  transition: ${transitionDuration};
  cursor: pointer;
  margin-top: 1em;

  &:hover {
    background: ${hoverItem};
  }
`;
