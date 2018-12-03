export const parse = (themeStr: string) => {
  const colors = themeStr.split(',');

  return {
    ColumnBG: colors[0],
    MenuBGHover: colors[1],
    ActiveItem: colors[2],
    ActiveItemText: colors[3],
    HoverItem: colors[4],
    TextColor: colors[5],
    ActivePresence: colors[6],
    MentionBadge: colors[7],
  };
};
