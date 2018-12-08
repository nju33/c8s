import styled from '../../styled';
import {theme} from '../../../helpers';

export const Pager = styled.div`
  flex: 0;
  height: 16px;
  transition: ${theme.transition};
  cursor: pointer;

  &:hover {
    background: ${theme.get('HoverItem')};
  }
`;
