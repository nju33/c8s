import styled from '@c8s/theme';
import vwxy from 'vwxy';

const columnBG = vwxy().theme.columnBG();

export const Separator = styled.div.attrs({role: 'separator'})`
  height: 1px;
  margin: .25em 0;
  border: none;

  &:before {
    content: '';
    width: 100%;
    height: inherit;
    border-bottom: 1px solid ${columnBG};
    position: absolute;
    left: 0;
    margin-top: -1px;
  }
`;