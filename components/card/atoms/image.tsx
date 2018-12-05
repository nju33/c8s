import styled from '../../styled';

export const Image = styled.img`
  max-width: 100%;
  text-align: center;

  &[src=''] {
    display: none;
  }
`;