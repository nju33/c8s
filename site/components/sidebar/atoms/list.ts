import styled from '@c8s/theme';
import vwxy from 'vwxy';

const transitionDuration = vwxy().theme.transitionDuration();
const activeItem = vwxy().theme.activeItem();
const activeItemText = vwxy().theme.activeItemText();

export const List = styled.div`
  width: 200px;
  box-sizing: border-box;
  line-height: 2.1;
  list-style: none;
  margin: 0;
  border-right: 1px solid #393939;

  & a {
    color: inherit;
    text-decoration: none;
    transition-duration: ${transitionDuration};
    display: inline-block;
    width: 100%;
    padding: .5em 2em;
    box-sizing: border-box;

    &:hover {
      background: ${activeItem};
      color: ${activeItemText};
    }
  }
`;
