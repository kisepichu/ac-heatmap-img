export interface Submission {
  id: number;
  epoch_second: number;
  problem_id: string;
  contest_id: string;
  user_id: string;
  language: string;
  point: number;
  length: number;
  result: string;
  execution_time: number | null;
}

// 判定結果の文字列リテラル型
export type JudgeResult = 'AC' | 'WA' | 'CE' | 'RE' | 'TLE' | 'MLE';

// 提出結果の型（将来的に新しい判定が追加される可能性を考慮）
export type SubmissionResult = JudgeResult | string;

export interface SubmissionResponse {
  submissions: Submission[];
  hasMore: boolean;
}
