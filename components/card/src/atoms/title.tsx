import styled from '@c8s/theme';
import vwxy from 'vwxy';

const activePresence = vwxy().theme.activePresence;

export const Title = styled.h3`
  font-size: 16px;
  color: ${activePresence};

  &:empty {
    display: none;
  }
`;
