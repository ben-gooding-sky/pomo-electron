import { useContext } from 'react';
import { Palette } from '@client/styles/styled';
import { ThemeContext } from 'styled-components';

type CssSize = '%' | 'em' | 'px';
type Size = `${string}${CssSize}`;

export type SvgSize =
  | { color: keyof Palette; size: Size }
  | { color: keyof Palette; width: Size; height: Size };

interface IconProps {
  color: string;
  width: Size;
  height: Size;
}

export function useIcon(props: SvgSize): IconProps {
  const themeContext = useContext(ThemeContext);
  const { width, height } = 'width' in props ? props : { width: props.size, height: props.size };
  return {
    width,
    height,
    color: themeContext.palette[props.color],
  };
}
