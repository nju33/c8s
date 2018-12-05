import styled from '../../styled';
import {theme} from '../../../helpers';

export const A = styled.a`
  display: inline-block;
  border-top: 1px solid ${theme.get('HoverItem')};
  margin-top: 1em;
  padding: 0.5em 3em;
  font-size: .9em;
  border-radius: ${theme.borderRadius};

  &:not([href]) {
    display: none;
  }

  &[href]:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: ${theme.transition};
    border-bottom: 2px solid ${theme.get('ActivePresence')};
  }
`;
