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
  /* margin: 2px; */
  border-radius: ${theme.borderRadius};

  &[data-position='top']:not(:first-child),
  &[data-position='bottom']:not(:first-child) {
    margin-left: 2px;
  }

  &[data-position='left']:not(:first-child),
  &[data-position='right']:not(:first-child) {
    margin-top: 2px;
  }

  /* &[data-position='left']:last-child,
  &[data-position='right']:last-child {
    margin-bottom: 0;
  } */

  & + & {
    border-left: 1px solid ${theme.get('HoverItem')};
  }
`;
