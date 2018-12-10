import styled from '../../styled';
import { Title } from './title';

export const Box = styled.div`
  width: 710px;
  padding-left: 2em;

  & & {
    padding-left: 0;
  }

  & > & ${Title} {
    font-size: 18px;
  }

  & > & ${Title} {
    height: 50px;
  }
`;