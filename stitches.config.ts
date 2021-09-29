import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  getCssText,
  theme,
  createTheme,
  config,
  keyframes,
} = createStitches({
  theme: {
    colors: {
      black: 'hsl(18 5% 5%)',
      black00: 'hsl(18 5% 5% / 0)',
      black50: 'hsl(18 5% 5%, 0.5)',
      white: 'hsl(0 0% 100%)',
      white00: 'hsl(0 0% 100% / 0)',
      white03: 'hsl(0 0% 100% / 0.03)',
      white10: 'hsl(0 0% 100% / 0.1)',
      white20: 'hsl(0 0% 100% / 0.2)',
      white40: 'hsl(0 0% 100% / 0.4)',
      white50: 'hsl(0 0% 100% / 0.5)',
      white60: 'hsl(0 0% 100% / 0.6)',
      white70: 'hsl(0 0% 100% / 0.7)',
      white80: 'hsl(0 0% 100% / 0.8)',
      white90: 'hsl(0 0% 100% / 0.9)',
      orange: 'hsl(18 83% 47%)',
      orange05: 'hsl(18 83% 47% / 0.05)',
      orange15: 'hsl(18 83% 47% / 0.15)',
      orange50: 'hsl(18 83% 47% / 0.50)',
      orange75: 'hsl(18 83% 47% / 0.75)',
      lightOrange: 'hsl(27 99% 44%)',
      green: 'hsl(122 33% 58%)',
      green00: 'hsl(122 33% 58% / 0)',
      green15: 'hsl(122 33% 58% / 0.15)',
    },
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    },
  },
});
