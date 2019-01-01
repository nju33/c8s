import styled from '@c8s/theme';
import vwxy from 'vwxy';

const borderRadius = vwxy().theme.borderRadius(0);

export const Editor = styled.pre`
  background: #222;
  padding: 0.5em 3em;
  border-radius: ${borderRadius};
  margin-top: 0;

  & > code {
    background: transparent;
    color: #ccc;
  }
`;
