export type ThemeMode =
  | 'light_default'
  | 'light_high_contrast'
  | 'light_protanopia_deuteranopia'
  | 'light_tritanopia'
  | 'dark_default'
  | 'dark_high_contrast'
  | 'dark_protanopia_deuteranopia'
  | 'dark_tritanopia'
  | 'dark_dimmed';

export interface ThemeOptions {
  cellRadius: number;
  cellGap: number;
}

export interface ThemeConfig {
  mode: ThemeMode;
  options: ThemeOptions;
}

export interface Config {
  users: string[];
  theme: ThemeConfig;
}
