import styled from '@c8s/theme';
import {darken, lighten, getLuminance} from 'polished';
import {compose, converge, ifElse, gte} from 'ramda';
import vwxy from 'vwxy';

const transitionDuration = vwxy().theme.transitionDuration('.2s');
const borderRadius = vwxy().theme.borderRadius(0);
const activeItem = vwxy().theme.activeItem();
const activeItemText = vwxy().theme.activeItemText();
const adjustColor = ifElse(
  converge(gte, [getLuminance, () => 0.5]),
  lighten(0.13),
  darken(0.13),
);

export const Button = styled.button`
  transition-duration: ${transitionDuration};
  border-radius: ${borderRadius};
  background: ${activeItem};
  color: ${activeItemText};
  border: none;
  cursor: pointer;
  padding: 0.5em 3em;
  margin-top: 1em;
  font-size: 0.9em;

  &:hover {
    background: ${compose(
      adjustColor,
      activeItem,
    )};
  }
`;
