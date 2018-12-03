import {ThemeInterface} from './../components/styled';
import {GetThemeFn} from '../components/styled';

export const get: (name: keyof ThemeInterface) => GetThemeFn = name => ({
  theme,
}) => {
  return theme[name];
};
