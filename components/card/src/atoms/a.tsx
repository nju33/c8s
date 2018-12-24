import styled from '@c8s/theme';
import vwxy from 'vwxy';

const hoverItem = vwxy().theme.hoverItem();
const activePresence = vwxy().theme.activePresence();
const borderRadius = vwxy().theme.borderRadius();
const transitionDuration = vwxy().theme.transitionDuration();

export const A = styled.a`
  display: inline-block;
  border-top: 1px solid ${hoverItem};
  margin-top: 1em;
  padding: 0.5em 3em;
  font-size: .9em;
  border-radius: ${borderRadius};

  &:not([href]) {
    display: none;
  }

  &[href]:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: ${transitionDuration};
    border-bottom: 2px solid ${activePresence};
  }
`;
