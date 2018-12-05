import styled from '../../styled';
import {theme} from '../../../helpers';

export const Title = styled.h3`
  font-size: 16px;
  color: ${theme.get('ActivePresence')};

  &:empty {
    display: none;
  }
`;
