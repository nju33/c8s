import styled from '../../styled';
import {theme} from '../../../helpers';

export const Input = styled.input`
  transition: ${theme.transition};
  box-shadow: ${theme.boxShadow};
  border: 1px solid ${theme.get('HoverItem')};
  padding: 0.5em;
  border-radius: ${theme.borderRadius};
`;
