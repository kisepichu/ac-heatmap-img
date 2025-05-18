/**
 * 日本のタイムゾーンオフセット（ミリ秒）
 */
const JST_OFFSET = 9 * 60 * 60 * 1000;

/**
 * Unix時間（秒）をJSTの日付に変換する
 */
export function unixTimeToJstDate(epochSecond: number): Date {
  // Unix時間（秒）をミリ秒に変換し、JSTのオフセットを加算
  const utcMs = epochSecond * 1000;
  const jstMs = utcMs + JST_OFFSET;
  return new Date(jstMs);
}

/**
 * 指定された年の開始時刻（JST）をUnix時間（秒）で返す
 */
export function getJstYearStartEpoch(year: number): number {
  const date = new Date(year, 0, 1);
  return Math.floor((date.getTime() - JST_OFFSET) / 1000);
}

/**
 * 指定された年の終了時刻（JST）をUnix時間（秒）で返す
 */
export function getJstYearEndEpoch(year: number): number {
  const date = new Date(year + 1, 0, 1);
  return Math.floor((date.getTime() - JST_OFFSET) / 1000);
}

/**
 * 日付をYYYY-MM-DD形式の文字列に変換する
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
