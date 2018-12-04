import styled from '../../styled';

export const Title = styled.h1`
  font-size: 34px;
  height: 100px;
  margin: 0;
  display: flex;
  align-items: center;
  margin: -4px 0 4px;

  &:empty {
    display: none;
  }
`;