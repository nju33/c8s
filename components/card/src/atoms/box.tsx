import styled from '@c8s/theme';
import vwxy from 'vwxy';

const columnBG = vwxy().theme.columnBG();
const borderRadius = vwxy().theme.borderRadius();
const transitionDuration = vwxy().theme.transitionDuration();


export const Box = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  transition: ${transitionDuration};
  margin-top: 1em;
  border: 1px solid ${columnBG};
  font-size: 0.9em;
  border-radius: ${borderRadius};
  position: relative;

  & > a {
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }
`;