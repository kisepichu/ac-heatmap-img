import { SubmissionCache } from '../types/cache';
import { Result } from '../types/result';
import { Submission } from '../types/submission';

export interface SubmissionRepository {
  fetchUserSubmissions(userId: string, year: number): Promise<Result<Submission[]>>;
  getCachedSubmissions(userId: string): Promise<Result<SubmissionCache | null>>;
  cacheSubmissions(
    userId: string,
    submissions: Submission[],
    lastEpochSecond: number
  ): Promise<Result<void>>;
}
