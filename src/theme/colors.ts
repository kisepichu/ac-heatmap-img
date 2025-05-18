import { ThemeMode } from '../types/config';

export interface ThemeColors {
  background: string;
  border: string;
  text: string;
  levels: string[];
}

const lightDefault: ThemeColors = {
  background: '#ffffff',
  border: '#d0d7de',
  text: '#24292f',
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
  text: '#1b1f23',
  levels: [
    '#ffcc00',
    '#ffe066',
    '#ffeda0',
    '#fff6cc',
    '#f0f0f0',
    '#85e89d',
    '#34d058',
    '#28a745',
    '#176f2c',
  ],
};

const lightProtanopiaDeuteranopia: ThemeColors = {
  background: '#ffffff',
  border: '#d0d7de',
  text: '#24292f',
  levels: [
    '#ffcc00',
    '#ffe066',
    '#fff0a0',
    '#fff6cc',
    '#ebedf0',
    '#a8d1ff',
    '#66b3ff',
    '#3399ff',
    '#007fff',
  ],
};

const lightTritanopia: ThemeColors = {
  background: '#ffffff',
  border: '#d0d7de',
  text: '#24292f',
  levels: [
    '#ffcc00',
    '#ffe066',
    '#ffef99',
    '#fff6cc',
    '#ebedf0',
    '#b3d1ff',
    '#66a3ff',
    '#3380ff',
    '#0066ff',
  ],
};

const darkDefault: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#d19100',
    '#a36200',
    '#7a4600',
    '#4b2900',
    '#161b22',
    '#003820',
    '#006d32',
    '#26a641',
    '#39d353',
  ],
};

const darkHighContrast: ThemeColors = {
  background: '#000000',
  border: '#ffffff',
  text: '#ffffff',
  levels: [
    '#e5b700',
    '#c98d00',
    '#996700',
    '#694100',
    '#0a0c10',
    '#007f3f',
    '#00a359',
    '#00c470',
    '#00ec88',
  ],
};

const darkProtanopiaDeuteranopia: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#e6c84d',
    '#c99900',
    '#996600',
    '#664000',
    '#161b22',
    '#1a5fff',
    '#1a6fff',
    '#1e7fe0',
    '#338fcc',
  ],
};

const darkTritanopia: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#cc6666',
    '#b34d4d',
    '#993333',
    '#802020',
    '#161b22',
    '#1a5fff',
    '#1a6fff',
    '#1e7fe0',
    '#338fcc',
  ],
};

const chatGptPurple: ThemeColors = {
  background: '#0d1117',
  border: '#30363d',
  text: '#c9d1d9',
  levels: [
    '#cc6666',
    '#b34d4d',
    '#993333',
    '#802020',
    '#161b22',
    '#3322ff',
    '#4d33ff',
    '#6644ff',
    '#8054ff',
  ],
};

const darkDimmed: ThemeColors = {
  background: '#22272e',
  border: '#373e47',
  text: '#adbac7',
  levels: [
    '#d1a100',
    '#a36a00',
    '#7a4c00',
    '#4b2e00',
    '#2d333b',
    '#005f3f',
    '#238636',
    '#2ea043',
    '#3fb950',
  ],
};

const cursorMatrix: ThemeColors = {
  background: '#0c0c0c',
  border: '#1e1e1e',
  text: '#00ff41',
  levels: [
    '#ff0000', 
    '#cc0000',
    '#990000',
    '#660000',
    '#0f160f', 
    '#00b32d', 
    '#00cc33',
    '#00e639',
    '#00ff41', 
  ],
};


const cursorNord: ThemeColors = {
  background: '#2e3440',
  border: '#434c5e',
  text: '#eceff4',
  levels: [
    '#bf616a', 
    '#d08770',
    '#ebcb8b',
    '#e5c07b',
    '#3b4252', 
    '#8fbcbb', 
    '#88c0d0',
    '#81a1c1',
    '#5e81ac', 
  ],
};

const chatGptPastelDreams: ThemeColors = {
  background: '#fefaff',
  border: '#d8cde8',
  text: '#574b63',
  levels: [
    '#ffc1cc',
    '#ffd6de',
    '#ffe6eb',
    '#fff2f5',
    '#f4f0fa',
    '#d2e2ff',
    '#a3c5ff',
    '#7fa9ff',
    '#5a8cff',
  ],
};

const chatGptMatchaMocha: ThemeColors = {
  background: '#f6f4ee',
  border: '#cfcab3',
  text: '#5c5a48',
  levels: [
    '#e1aa00',
    '#efc75e',
    '#f5dda2',
    '#f9efd6',
    '#eae7db',
    '#aad1b6',
    '#7fb892',
    '#5a9f6f',
    '#3b804f',
  ],
};

const chatGptMidnightNeon: ThemeColors = {
  background: '#0b0f1a',
  border: '#2c2f3a',
  text: '#c5cbe3',
  levels: [
    '#85004b',
    '#a00060',
    '#c00075',
    '#e04c9a',
    '#1b1d2a',
    '#00ffe7',
    '#00d6b6',
    '#00aa8e',
    '#007766',
  ],
};

const chatGptSunsetSerenity: ThemeColors = {
  background: '#fff8f0',
  border: '#e0cbbf',
  text: '#5c3c3c',
  levels: [
    '#ff6b6b',
    '#ff8c75',
    '#ffac8c',
    '#ffd3b6',
    '#fdf2e9',
    '#d0f4de',
    '#a1e8cc',
    '#70d6aa',
    '#49c393',
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
    case 'chat_gpt_purple':
      return chatGptPurple;
    case 'cursor_matrix':
      return cursorMatrix;
    case 'cursor_nord':
      return cursorNord;
    case 'chat_gpt_pastel_dreams':
      return chatGptPastelDreams; 
    case 'chat_gpt_matcha_mocha':
      return chatGptMatchaMocha;
    case 'chat_gpt_midnight_neon':
      return chatGptMidnightNeon;
    case 'chat_gpt_sunset_serenity':
      return chatGptSunsetSerenity;
  }
};
