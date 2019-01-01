export interface ThemeColorValues {
  columnBG: string;
  menuBGHover: string;
  activeItem: string;
  activeItemText: string;
  hoverItem: string;
  textColor: string;
  activePresence: string;
  mentionBadge: string;
}

export interface ThemeCommonValues {
  lineHeight: string | number;
  borderRadius: string | number;
  transitionDuration: string;
  transitionTimingFunction: string;
} 

export type ThemeValues = ThemeColorValues & ThemeCommonValues;