import { AtCoderProblemsClient } from '../../api/atcoder-problems-client';
import { FileSystemCacheManager } from '../../utils/cache/cache-manager';
import { SubmissionCache } from '../types/cache';
import { AppError, Result, err, ok } from '../types/result';
import { Submission } from '../types/submission';
import { SubmissionRepository } from './submission-repository';

const MAX_SUBMISSIONS_PER_REQUEST = 500;

export class AtCoderSubmissionRepository implements SubmissionRepository {
  constructor(
    private readonly client: AtCoderProblemsClient,
    private readonly cacheManager: FileSystemCacheManager
  ) {}

  private getCacheKey(userId: string): string {
    return `submissions_${userId}`;
  }

  private getYearStartEpoch(year: number): number {
    // JSTでの年の開始時刻を取得（UTCでの前日15:00）
    return Math.floor(new Date(Date.UTC(year, 0, 1, -9, 0, 0)).getTime() / 1000);
  }

  async getFirstSubmissionYear(userId: string): Promise<Result<number>> {
    // APIから最古の提出を取得
    const result = await this.client.fetchSubmissions(userId, 0);
    if (!result.success) {
      return result;
    }

    if (result.data.length === 0) {
      return err(new AppError('No submissions found'));
    }

    const firstSubmission = result.data.sort((a, b) => a.epoch_second - b.epoch_second)[0];
    return ok(new Date(firstSubmission.epoch_second * 1000).getFullYear());
  }

  async getCachedSubmissions(userId: string): Promise<Result<SubmissionCache | null>> {
    const cacheKey = this.getCacheKey(userId);
    return await this.cacheManager.get<SubmissionCache>(cacheKey);
  }

  async cacheSubmissions(
    userId: string,
    submissions: Submission[],
    lastEpochSecond: number
  ): Promise<Result<void>> {
    const cacheKey = this.getCacheKey(userId);
    // epoch_secondでソート
    const sortedSubmissions = [...submissions].sort((a, b) => a.epoch_second - b.epoch_second);
    const cache: SubmissionCache = {
      submissions: sortedSubmissions,
      lastEpochSecond,
      userId,
      updatedAt: Math.floor(Date.now() / 1000),
    };
    return await this.cacheManager.set(cacheKey, cache);
  }

  private removeDuplicates(submissions: Submission[]): Submission[] {
    // idをキーとして重複を除去
    const uniqueSubmissions = new Map<number, Submission>();
    for (const submission of submissions) {
      uniqueSubmissions.set(submission.id, submission);
    }
    return Array.from(uniqueSubmissions.values());
  }

  async fetchUserSubmissions(userId: string, year: number): Promise<Result<Submission[]>> {
    const fromSecond = this.getYearStartEpoch(year);
    const nextYearStart = this.getYearStartEpoch(year + 1);
    let allSubmissions: Submission[] = [];

    const cachedResult = await this.getCachedSubmissions(userId);
    if (!cachedResult.success) {
      return cachedResult;
    }

    // キャッシュがある場合は該当年のデータを抽出
    if (cachedResult.data !== null) {
      const cachedSubmissions = cachedResult.data.submissions.filter(
        (s) => s.epoch_second >= fromSecond && s.epoch_second < nextYearStart
      );
      allSubmissions = cachedSubmissions;
    }

    // 要求された年のデータが不完全な場合は、その年の開始時点から取得
    let hasMore = true;
    let currentFromSecond = fromSecond;
    let latestSubmissions: Submission[] = [];

    while (hasMore) {
      const result = await this.client.fetchSubmissions(userId, currentFromSecond);
      if (!result.success) {
        return result;
      }

      const submissions = result.data;
      // 要求された年の範囲内のデータのみを追加
      const relevantSubmissions = submissions.filter(
        (s) => s.epoch_second >= fromSecond && s.epoch_second < nextYearStart
      );
      latestSubmissions = [...latestSubmissions, ...relevantSubmissions];

      // 次のページの判定
      if (
        submissions.length < MAX_SUBMISSIONS_PER_REQUEST ||
        (submissions.length > 0 &&
          submissions[submissions.length - 1].epoch_second >= nextYearStart)
      ) {
        hasMore = false;
      } else {
        const lastSubmission = submissions[submissions.length - 1];
        currentFromSecond = lastSubmission.epoch_second + 1;
      }
    }

    // 新しい提出を追加（重複を除去）
    allSubmissions = this.removeDuplicates([...allSubmissions, ...latestSubmissions]).sort(
      (a, b) => a.epoch_second - b.epoch_second
    );

    // キャッシュの更新（全期間のデータを保持）
    if (latestSubmissions.length > 0) {
      const existingSubmissions = cachedResult.data?.submissions ?? [];
      const allCachedSubmissions = this.removeDuplicates([
        ...existingSubmissions,
        ...latestSubmissions,
      ]);

      // 最新のepoch_secondを取得
      const lastEpochSecond = Math.max(...allCachedSubmissions.map((s) => s.epoch_second));

      const cacheResult = await this.cacheSubmissions(
        userId,
        allCachedSubmissions,
        lastEpochSecond
      );
      if (!cacheResult.success) {
        return err(new AppError('Failed to cache submissions', cacheResult.error));
      }
    }

    // 指定年のデータのみを返す
    return ok(allSubmissions);
  }
}
