import styled from '@c8s/theme';

export const H = styled.div`
  font-size: 27px;
  height: 100px;
  margin: 0;
  display: flex;
  align-items: center;
  margin: -4px 0 4px;

  &:empty {
    display: none;
  }
`;
