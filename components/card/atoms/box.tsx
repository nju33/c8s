import styled from '../../styled';
import {theme} from '../../../helpers';

export const Box = styled.div`
  display: inline-flex;
  flex-direction: column;
  transition: ${theme.transition};
  margin-top: 1em;
  border: 1px solid ${theme.get('HoverItem')};
  box-shadow: ${theme.boxShadow};
  font-size: 0.9em;
  border-radius: ${theme.borderRadius};
  position: relative;
`;
