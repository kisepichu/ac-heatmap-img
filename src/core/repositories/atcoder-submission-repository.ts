import { AtCoderProblemsClient } from '../../api/atcoder-problems-client';
import { FileSystemCacheManager } from '../../utils/cache/cache-manager';
import { AppError, Result, err, ok } from '../types/result';
import { Submission } from '../types/submission';
import { SubmissionRepository } from './submission-repository';

export class AtCoderSubmissionRepository implements SubmissionRepository {
  constructor(
    private readonly client: AtCoderProblemsClient,
    private readonly cacheManager: FileSystemCacheManager
  ) {}

  private getCacheKey(userId: string, year: number): string {
    return `submissions_${userId}_${year}`;
  }

  private getYearStartEpoch(year: number): number {
    return Math.floor(new Date(year, 0, 1).getTime() / 1000);
  }

  async getCachedSubmissions(userId: string, year: number): Promise<Result<Submission[] | null>> {
    const cacheKey = this.getCacheKey(userId, year);
    return await this.cacheManager.get<Submission[]>(cacheKey);
  }

  async cacheSubmissions(
    userId: string,
    year: number,
    submissions: Submission[]
  ): Promise<Result<void>> {
    const cacheKey = this.getCacheKey(userId, year);
    return await this.cacheManager.set(cacheKey, submissions);
  }

  async fetchUserSubmissions(userId: string, year: number): Promise<Result<Submission[]>> {
    // まずキャッシュをチェック
    const cachedResult = await this.getCachedSubmissions(userId, year);
    if (!cachedResult.success) {
      return cachedResult;
    }
    if (cachedResult.data !== null) {
      return ok(cachedResult.data);
    }

    // キャッシュがない場合は API から取得
    const fromSecond = this.getYearStartEpoch(year);
    const result = await this.client.fetchSubmissions(userId, fromSecond);

    if (!result.success) {
      return result;
    }

    // 年内の提出のみをフィルタリング
    const nextYearStart = this.getYearStartEpoch(year + 1);
    const yearSubmissions = result.data.filter(
      (submission) =>
        submission.epoch_second >= fromSecond && submission.epoch_second < nextYearStart
    );

    // キャッシュに保存
    const cacheResult = await this.cacheSubmissions(userId, year, yearSubmissions);
    if (!cacheResult.success) {
      return err(new AppError('Failed to cache submissions', cacheResult.error));
    }

    return ok(yearSubmissions);
  }
}
