import styled from '@c8s/theme';
import vwxy from 'vwxy';

const transitionDuration = vwxy().theme.transitionDuration();
const activeItem = vwxy().theme.activeItem();
const activeItemText = vwxy().theme.activeItemText();
const columnBG = vwxy().theme.columnBG();
const borderRadius = vwxy().theme.borderRadius();

export const Switch = styled.div`
  transition-duration: ${transitionDuration};

  &[aria-selected='false'] {
    background: ${columnBG};
    cursor: pointer;
  }

  &[aria-selected='false']:hover {
    background: ${activeItem};
    color: ${activeItemText};
  }

  &[aria-selected='true'] {
    background: ${activeItem};
    color: ${activeItemText};
  }

  transition: 0.05s;
  padding: 0.5em 3em;
  /* margin: 2px; */
  border-radius: ${borderRadius};

  &[data-position='top']:not(:first-child),
  &[data-position='bottom']:not(:first-child) {
    margin-left: 2px;
  }

  &[data-position='left']:not(:first-child),
  &[data-position='right']:not(:first-child) {
    margin-top: 2px;
  }

  & + & {
    border-left: 1px solid ${columnBG};
  }
`;
