import styled from '../../styled';
import {theme} from '../../../helpers';

export const Separator = styled.div`
  padding: 0 .7em;

  &:before {
    content: '';
    display: inline-block;
    height: 1em;
    border-left: 1px solid ${theme.get('HoverItem')};
    transform: rotate(30deg);
    transform-origin: center center;
  }
`;
