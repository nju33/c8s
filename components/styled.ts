import * as styledComponents from 'styled-components';
// tslint:disable-next-line:no-duplicate-imports
import {ThemedStyledComponentsModule} from 'styled-components';

export interface ThemeInterface {
  ColumnBG: string;
  MenuBGHover: string;
  ActiveItem: string;
  ActiveItemText: string;
  HoverItem: string;
  TextColor: string;
  ActivePresence: string;
  MentionBadge: string;
}

export type GetThemeFn = (props: {theme: ThemeInterface}) => string;

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export {css, createGlobalStyle, keyframes, ThemeProvider};
export default styled;
