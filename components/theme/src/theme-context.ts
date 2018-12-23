import React from 'react';
import {parse} from './helpers/slack';
import {ThemeValues} from './theme';

/**
 * @see {@link https://slackthemes.net/#/uber_light}
 */
const DEFAULT =
  '#F2F2F4,#E6E6E9,#1FBAD6,#FFFFFF,#C0C0C8,#151525,#1FBAD6,#4CC8DE';

export const theme: ThemeValues = {
  ...parse(DEFAULT),
  lineHeight: 1.6,
  borderRadius: 0,
  transitionDuration: '0.2s',
  transitionTimingFunction: 'linear',
};

export const ThemeContext = React.createContext(theme);
