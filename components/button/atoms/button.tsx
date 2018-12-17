import styled from '../../styled';
import {theme} from '../../../site/helpers';

export const Button = styled.button`
  transition: ${theme.transition};
  cursor: pointer;
  padding: 0.5em 3em;
  margin-top: 1em;
  border: 1px solid ${theme.get('HoverItem')};
  box-shadow: ${theme.boxShadow};
  font-size: 0.9em;
  border-radius: ${theme.borderRadius};

  &:hover {
    background: ${theme.get('ActiveItem')};
    color: ${theme.get('ActiveItemText')};
  }
`;
