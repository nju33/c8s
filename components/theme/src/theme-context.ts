import React from 'react';

export interface ThemeContextProps {
  ColumnBG: string;
  MenuBGHover: string;
  ActiveItem: string;
  ActiveItemText: string;
  HoverItem: string;
  TextColor: string;
  ActivePresence: string;
  MentionBadge: string;
}

export const ThemeContext = React.createContext<ThemeContextProps>({} as any);
