export type ThemeMode =
  | 'light_default'
  | 'light_high_contrast'
  | 'light_protanopia_deuteranopia'
  | 'light_tritanopia'
  | 'dark_default'
  | 'dark_high_contrast'
  | 'dark_protanopia_deuteranopia'
  | 'dark_tritanopia'
  | 'dark_dimmed'
  | 'chat_gpt_purple'
  | 'cursor_matrix'
  | 'cursor_nord'
  | 'chat_gpt_pastel_dreams'
  | 'chat_gpt_matcha_mocha'
  | 'chat_gpt_midnight_neon'
  | 'chat_gpt_sunset_serenity';

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
