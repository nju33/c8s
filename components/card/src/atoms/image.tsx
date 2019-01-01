import styled from '@c8s/theme';

export const Image = styled.img`
  max-width: 100%;
  text-align: center;

  &[src=''] {
    display: none;
  }

  & + * {
    padding: .5em;
  }
`;