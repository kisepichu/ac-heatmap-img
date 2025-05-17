import { Result } from '../types/result';
import { Submission } from '../types/submission';

export interface SubmissionRepository {
  fetchUserSubmissions(userId: string, year: number): Promise<Result<Submission[]>>;
  getCachedSubmissions(userId: string, year: number): Promise<Result<Submission[] | null>>;
  cacheSubmissions(userId: string, year: number, submissions: Submission[]): Promise<Result<void>>;
}
