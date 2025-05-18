/**
 * 日付ごとの提出状態
 */
export interface DailySubmissions {
  /**
   * ACした提出の数
   */
  acCount: number;

  /**
   * AC以外の提出の数
   */
  nonAcCount: number;
}

/**
 * ヒートマップのデータ型
 * 日付をキーとして、その日の提出状態を値とする
 */
export interface HeatmapData {
  [date: string]: DailySubmissions;
}

/**
 * ヒートマップの設定
 */
export interface HeatmapConfig {
  /**
   * 年
   */
  year: number;

  /**
   * 最大AC数（この値を基準に色の濃さを決定）
   */
  maxCount: number;
}
