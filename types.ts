export interface AestheticResponse {
  text: string;
  author?: string;
}

export enum ThemeMode {
  Gradient = 'GRADIENT',
  Transparent = 'TRANSPARENT',
  Dark = 'DARK'
}