import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AtCoderProblemsClient } from '../../../../src/api/atcoder-problems-client';
import { AtCoderSubmissionRepository } from '../../../../src/core/repositories/atcoder-submission-repository';
import { SubmissionCache } from '../../../../src/core/types/cache';
import { ApiError, CacheError, err, ok } from '../../../../src/core/types/result';
import { Submission } from '../../../../src/core/types/submission';
import { FileSystemCacheManager } from '../../../../src/utils/cache/cache-manager';

vi.mock('../../../../src/api/atcoder-problems-client');
vi.mock('../../../../src/utils/cache/cache-manager');

describe('AtCoderSubmissionRepository', () => {
  const mockSubmission: Submission = {
    id: 1,
    epoch_second: 1577804400, // 2020-01-01 00:00:00 JST (UTC: 2019-12-31 15:00:00)
    problem_id: 'test_problem',
    contest_id: 'test_contest',
    user_id: 'test_user',
    language: 'C++',
    point: 100,
    length: 1000,
    result: 'AC',
    execution_time: 100,
  };

  const mockCache: SubmissionCache = {
    submissions: [mockSubmission],
    lastEpochSecond: 1577804400, // 2020-01-01 00:00:00 JST (UTC: 2019-12-31 15:00:00)
    userId: 'test_user',
    updatedAt: 1577804400,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch submissions from cache if available', async () => {
    const mockClient = new AtCoderProblemsClient();
    const mockCacheManager = new FileSystemCacheManager();

    vi.spyOn(mockCacheManager, 'get').mockResolvedValue(ok(mockCache));
    vi.spyOn(mockClient, 'fetchSubmissions').mockResolvedValue(ok([]));

    const repository = new AtCoderSubmissionRepository(mockClient, mockCacheManager);
    const result = await repository.fetchUserSubmissions('test_user', 2020);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(mockSubmission);
    }
    expect(mockClient.fetchSubmissions).toHaveBeenCalledWith('test_user', mockCache.lastEpochSecond);
  });

  it('should fetch from API when cache misses', async () => {
    const mockClient = new AtCoderProblemsClient();
    const mockCacheManager = new FileSystemCacheManager();

    vi.spyOn(mockCacheManager, 'get').mockResolvedValue(ok(null));
    vi.spyOn(mockClient, 'fetchSubmissions').mockResolvedValue(ok([mockSubmission]));
    vi.spyOn(mockCacheManager, 'set').mockResolvedValue(ok(undefined));

    const repository = new AtCoderSubmissionRepository(mockClient, mockCacheManager);
    const result = await repository.fetchUserSubmissions('test_user', 2020);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(mockSubmission);
    }
    expect(mockClient.fetchSubmissions).toHaveBeenCalledTimes(1);
    expect(mockCacheManager.set).toHaveBeenCalledTimes(1);
  });

  it('should handle pagination when API returns max submissions', async () => {
    const mockClient = new AtCoderProblemsClient();
    const mockCacheManager = new FileSystemCacheManager();
    const submissions = Array(500).fill(mockSubmission);
    const nextSubmission = { ...mockSubmission, epoch_second: 1577836801 };

    vi.spyOn(mockCacheManager, 'get').mockResolvedValue(ok(null));
    vi.spyOn(mockClient, 'fetchSubmissions')
      .mockResolvedValueOnce(ok(submissions))
      .mockResolvedValueOnce(ok([nextSubmission]));
    vi.spyOn(mockCacheManager, 'set').mockResolvedValue(ok(undefined));

    const repository = new AtCoderSubmissionRepository(mockClient, mockCacheManager);
    const result = await repository.fetchUserSubmissions('test_user', 2020);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(501);
    }
    expect(mockClient.fetchSubmissions).toHaveBeenCalledTimes(2);
  });

  it('should handle API errors', async () => {
    const mockClient = new AtCoderProblemsClient();
    const mockCacheManager = new FileSystemCacheManager();

    vi.spyOn(mockCacheManager, 'get').mockResolvedValue(ok(null));
    vi.spyOn(mockClient, 'fetchSubmissions').mockResolvedValue(
      err(new ApiError('API Error', 500))
    );

    const repository = new AtCoderSubmissionRepository(mockClient, mockCacheManager);
    const result = await repository.fetchUserSubmissions('test_user', 2020);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(ApiError);
      expect((result.error as ApiError).statusCode).toBe(500);
    }
  });

  it('should handle cache errors', async () => {
    const mockClient = new AtCoderProblemsClient();
    const mockCacheManager = new FileSystemCacheManager();

    vi.spyOn(mockCacheManager, 'get').mockResolvedValue(
      err(new CacheError('Cache read error'))
    );

    const repository = new AtCoderSubmissionRepository(mockClient, mockCacheManager);
    const result = await repository.fetchUserSubmissions('test_user', 2020);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(CacheError);
    }
    expect(mockClient.fetchSubmissions).not.toHaveBeenCalled();
  });
}); 
