import styled from '@c8s/theme';

export const Title = styled.div.attrs({role: 'heading'})`
  font-size: 16px;

  &:empty {
    display: none;
  }
`;
