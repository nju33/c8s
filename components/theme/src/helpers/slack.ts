import {ThemeColorValues} from '../theme';

export const parse = (themeStr: string): ThemeColorValues => {
  const colors = themeStr.split(',');

  return {
    columnBG: colors[0],
    menuBGHover: colors[1],
    activeItem: colors[2],
    activeItemText: colors[3],
    hoverItem: colors[4],
    textColor: colors[5],
    activePresence: colors[6],
    mentionBadge: colors[7],
  };
};
