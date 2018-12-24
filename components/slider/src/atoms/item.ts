import styled from '@c8s/theme';

interface Data {
  'data-length': number;
}

const flexBasis = (props: Data) => {
  return `calc(100% / ${props['data-length']})`;
};

export const Item = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  flex-basis: ${flexBasis};
`;
