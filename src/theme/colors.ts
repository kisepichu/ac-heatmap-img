import { ThemeMode } from '../types/config';

export interface ThemeColors {
  background: string;
  border: string;
  text: string;
  levels: string[];
}

const lightDefault: ThemeColors = {
  background: '#ffffff',
  border: '#1b1f23',
  text: '#24292e',
  levels: [
    '#ffd700',
    '#ffe14c',
    '#ffee7c',
    '#fff5b1',
    '#ebedf0',
    '#9be9a8',
    '#40c463',
    '#30a14e',
    '#216e39',
  ],
};

const lightHighContrast: ThemeColors = {
  background: '#ffffff',
  border: '#1b1f23',
  text: '#24292e',
  levels: [
    '#ff4500',
    '#ffa500',
    '#ffd700',
    '#ffe14c',
    '#ebedf0',
    '#39d353',
    '#26a641',
    '#006d32',
    '#004e23',
  ],
};

const lightProtanopiaDeuteranopia: ThemeColors = {
  background: '#ffffff',
  border: '#1b1f23',
  text: '#24292e',
  levels: [
    '#dc143c',
    '#ff6347',
    '#ffa07a',
    '#ffcda8',
    '#ebedf0',
    '#b4daff',
    '#66b4ff',
    '#0969da',
    '#0a3069',
  ],
};

const lightTritanopia: ThemeColors = {
  background: '#ffffff',
  border: '#1b1f23',
  text: '#24292e',
  levels: [
    '#dc143c',
    '#ff6347',
    '#ffa07a',
    '#ffcda8',
    '#ebedf0',
    '#b4daff',
    '#66b4ff',
    '#0969da',
    '#0a3069',
  ],
};

const darkDefault: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#ffd700',
    '#b88900',
    '#856600',
    '#543a00',
    '#161b22',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ],
};

const darkHighContrast: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#ffd700',
    '#b88900',
    '#856600',
    '#543a00',
    '#161b22',
    '#004e23',
    '#006d32',
    '#26a641',
    '#39d353',
  ],
};

const darkProtanopiaDeuteranopia: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#ffd700',
    '#b88900',
    '#856600',
    '#543a00',
    '#161b22',
    '#0a3069',
    '#0969da',
    '#66b4ff',
    '#b4daff',
  ],
};

const darkTritanopia: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#ffd700',
    '#b88900',
    '#856600',
    '#543a00',
    '#161b22',
    '#0a3069',
    '#0969da',
    '#66b4ff',
    '#b4daff',
  ],
};

const darkDimmed: ThemeColors = {
  background: '#22272e',
  border: '#444c56',
  text: '#adbac7',
  levels: [
    '#ffd700',
    '#b88900',
    '#856600',
    '#543a00',
    '#2d333b',
    '#0e4429',
    '#006d32',
    '#26a641',
    '#39d353',
  ],
};

export const getThemeColors = (mode: ThemeMode): ThemeColors => {
  switch (mode) {
    case 'light_default':
      return lightDefault;
    case 'light_high_contrast':
      return lightHighContrast;
    case 'light_protanopia_deuteranopia':
      return lightProtanopiaDeuteranopia;
    case 'light_tritanopia':
      return lightTritanopia;
    case 'dark_default':
      return darkDefault;
    case 'dark_high_contrast':
      return darkHighContrast;
    case 'dark_protanopia_deuteranopia':
      return darkProtanopiaDeuteranopia;
    case 'dark_tritanopia':
      return darkTritanopia;
    case 'dark_dimmed':
      return darkDimmed;
  }
};
