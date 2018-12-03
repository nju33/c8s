import styled from '../../styled';
import {theme} from '../../../helpers';

export const Button = styled.button`
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: ${theme.get('ActivePresence')};
  }
`;
