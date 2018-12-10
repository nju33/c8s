import styled from '../../styled';
import {theme} from './../../../helpers';

export const Editor = styled.pre`
  background: #222;
  padding: 0.5em 3em;
  border-radius: ${theme.borderRadius};
  margin-top: 0;

  & > code {
    background: transparent;
    color: #ccc;
  }
`;
