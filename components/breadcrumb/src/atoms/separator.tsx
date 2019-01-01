import styled from '@c8s/theme';
import vwxy from 'vwxy';

const columnBG = vwxy().theme.columnBG();

export const Separator = styled.div`
  padding: 0 0.7em;
  margin-bottom: -.3em;

  &:before {
    content: '';
    display: inline-block;
    height: 1em;
    border-left: 1px solid ${columnBG};
    transform: rotate(30deg);
    transform-origin: center center;
  }
`;
