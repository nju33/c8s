import styled from '@c8s/theme';
import vwxy from 'vwxy';
import {ifElse, converge, gte, compose} from 'ramda';
import {lighten, darken, getLuminance} from 'polished';

const transitionDuration = vwxy().theme.transitionDuration();
const activeItem = vwxy().theme.activeItem();
const adjustColor = ifElse(
  converge(gte, [getLuminance, () => 0.5]),
  lighten(0.13),
  darken(0.13),
);

export const Container = styled.div`
  & a[href] {
    color: ${activeItem};
    text-decoration: none;
    transition-duration: ${transitionDuration};

    &:hover {
      color: ${compose(
        adjustColor,
        activeItem,
      )};
    }
  }
`;
