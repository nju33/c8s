import styled from '../../styled';
import {theme} from '../../../helpers';

export const Bowl = styled.div`
  height: 1.5em;
  width: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.get('ActivePresence')};
  margin: 0 3px;
  border-radius: ${theme.borderRadius};
`;
