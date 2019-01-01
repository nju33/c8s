import {ThemeInterface} from './../../components/styled';
import {GetThemeFn} from '../../components/styled';

export const get: (name: keyof ThemeInterface) => GetThemeFn = name => ({
  theme,
}) => {
  return theme[name];
};

export const boxShadow: GetThemeFn = ({theme}) => {
  return `0 0 4px 1px ${theme.HoverItem}`;
};

export const transition = () => {
  return '.2s';
};

export const borderRadius = () => {
  return '2px';
}

export const gutter = () => {
  return '1em';
}