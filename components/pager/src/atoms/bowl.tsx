import styled from '@c8s/theme';
import vwxy from 'vwxy';
import {ifElse, converge, gte, compose} from 'ramda';
import {lighten, darken, getLuminance} from 'polished';

const borderRadius = vwxy().theme.borderRadius();
const transitionDuration = vwxy().theme.transitionDuration();
const activeItem = vwxy().theme.activeItem();
const activeItemText = vwxy().theme.activeItemText();
const adjustColor = ifElse(
  converge(gte, [getLuminance, () => 0.5]),
  lighten(0.13),
  darken(0.13),
);

export const Bowl = styled.div`
  height: 1.5em;
  width: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 3px;
  border-radius: ${borderRadius};

  & > a:not([href]) {
    display: block;
    color: ${activeItem};
    font-weight: bold;
    margin: 0 -3px;
  }

  & > a[href] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${activeItemText};
    text-decoration: none;
    background: ${activeItem};
    transition-duration: ${transitionDuration};

    &:hover {
      background: ${compose(
        adjustColor,
        activeItem,
      )};
    }
  }
`;
