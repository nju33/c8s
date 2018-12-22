import * as styledComponents from 'styled-components';
// tslint:disable-next-line:no-duplicate-imports
import {ThemedStyledComponentsModule} from 'styled-components';

export interface ThemeInterface {
  columnBG: string;
  menuBGHover: string;
  activeItem: string;
  activeItemText: string;
  hoverItem: string;
  textColor: string;
  activePresence: string;
  mentionBadge: string;
}

export type GetThemeFn = (
  props: {theme: ThemeInterface},
) => string | styledComponents.FlattenInterpolation<any>;

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export {css, createGlobalStyle, keyframes, ThemeProvider};
export default styled;
