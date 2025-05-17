declare module 'cal-heatmap' {
  export interface CalHeatmapOptions {
    itemSelector: string;
    date?: {
      start?: Date;
      min?: Date;
      max?: Date;
      timezone?: string;
    };
    range?: number;
    domain?: {
      type?: string;
      gutter?: number;
    };
    subDomain?: {
      type?: string;
      width?: number;
      height?: number;
      gutter?: number;
    };
    scale?: {
      color?: {
        type?: string;
        scheme?: string;
        domain?: number[];
        colors?: string[];
      };
    };
  }

  export default class CalHeatmap {
    constructor();
    paint(options: CalHeatmapOptions): Promise<void>;
    update(data: { [key: string]: number }): void;
    destroy(): void;
  }
}

declare module 'cal-heatmap/cal-heatmap.css';
