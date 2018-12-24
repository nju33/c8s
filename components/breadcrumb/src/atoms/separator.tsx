import styled from '@c8s/theme';
import vwxy from 'vwxy';

const hoverItem = vwxy().theme.hoverItem();

export const Separator = styled.div`
  padding: 0 0.7em;

  &:before {
    content: '';
    display: inline-block;
    height: 1em;
    border-left: 1px solid ${hoverItem};
    transform: rotate(30deg);
    transform-origin: center center;
  }
`;
