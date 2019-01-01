import styled from '@c8s/theme';

export const H = styled.div`
  margin: 0;
  display: flex;
  align-items: center;

  &[aria-level='1'] {
    font-size: 3.5em;
    line-height: 2;
  }

  &[aria-level='2'] {
    font-size: 2.3em;
    line-height: 1.83;
  }

  &[aria-level='3'] {
    font-size: 1.6em;
    line-height: 1.6;
  }

  &[aria-level='4'] {
    font-size: 1.4em;
    line-height: 1.4;
  }

  &[aria-level='5'] {
    font-size: 1.25em;
    line-height: 1.4;
  }

  &[aria-level='6'] {
    font-size: 1.13em;
    line-height: 1.35;
  }

  &[aria-level='7'] {
    font-size: 1em;
    line-height: 1.3;
  }

  &[aria-level='8'] {
    font-size: 0.93em;
    line-height: 1.29;
  }

  &[aria-level='9'] {
    font-size: 0.84em;
    line-height: 1.285;
  }
`;
