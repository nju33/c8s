import styled from '../../styled';
import {theme} from '../../../helpers';

export const Switch = styled.div`
  &[aria-selected='false'] {
    background: ${theme.get('HoverItem')};
    color: ${theme.get('TextColor')};
    cursor: pointer;
  }

  &[aria-selected='false']:hover {
    background: ${theme.get('ActivePresence')};
    color: ${theme.get('ActiveItemText')};
  }

  &[aria-selected='true'] {
    background: ${theme.get('ActivePresence')};
    color: ${theme.get('ActiveItemText')};
  }

  transition: 0.05s;
  padding: 0.5em 3em;
  margin: 2px;
  border-radius: ${theme.borderRadius};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  & + & {
    border-left: 1px solid ${theme.get('HoverItem')};
  }
`;
