import React from 'react';
import {ThemeInterface} from './styled-components';
import {parse} from './helpers/slack';

// tslint:disable-next-line:no-empty-interface
export interface ThemeContextProps extends ThemeInterface {}

/**
 * @see {@link https://slackthemes.net/#/uber_light}
 */
const DEFAULT =
  '#F2F2F4,#E6E6E9,#1FBAD6,#FFFFFF,#C0C0C8,#151525,#1FBAD6,#4CC8DE';

export const ThemeContext = React.createContext<ThemeContextProps>(
  parse(DEFAULT),
);
