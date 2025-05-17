import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SubmissionRepository } from '../../../../src/core/repositories/submission-repository';
import { HeatmapService } from '../../../../src/core/services/heatmap-service';
import { AppError, err, ok } from '../../../../src/core/types/result';
import { Submission } from '../../../../src/core/types/submission';

describe('HeatmapService', () => {
  let mockRepository: SubmissionRepository;
  let service: HeatmapService;

  beforeEach(() => {
    mockRepository = {
      fetchUserSubmissions: vi.fn(),
      getCachedSubmissions: vi.fn(),
      cacheSubmissions: vi.fn(),
    };
    service = new HeatmapService(mockRepository);
  });

  const mockSubmissions: Submission[] = [
    {
      id: 1,
      epoch_second: 1577836800, // 2020-01-01 00:00:00 JST
      problem_id: 'problem1',
      contest_id: 'contest1',
      user_id: 'user1',
      language: 'C++',
      point: 100,
      length: 1000,
      result: 'AC',
      execution_time: 100,
    },
    {
      id: 2,
      epoch_second: 1577836800, // 2020-01-01 00:00:00 JST (同じ日の2回目のAC)
      problem_id: 'problem2',
      contest_id: 'contest1',
      user_id: 'user1',
      language: 'C++',
      point: 100,
      length: 1000,
      result: 'AC',
      execution_time: 100,
    },
    {
      id: 3,
      epoch_second: 1577923200, // 2020-01-02 00:00:00 JST
      problem_id: 'problem3',
      contest_id: 'contest1',
      user_id: 'user1',
      language: 'C++',
      point: 100,
      length: 1000,
      result: 'WA', // これはnonAcCountとしてカウントされる
      execution_time: 100,
    },
  ];

  it('should generate heatmap data correctly', async () => {
    vi.spyOn(mockRepository, 'fetchUserSubmissions').mockResolvedValue(ok(mockSubmissions));

    const result = await service.generateHeatmapData('user1', 2020);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        '2020-01-01': {
          acCount: 2,
          nonAcCount: 0,
        },
        '2020-01-02': {
          acCount: 0,
          nonAcCount: 1,
        },
      });
    }
  });

  it('should handle repository errors', async () => {
    vi.spyOn(mockRepository, 'fetchUserSubmissions').mockResolvedValue(
      err(new AppError('Repository error'))
    );

    const result = await service.generateHeatmapData('user1', 2020);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(AppError);
      expect(result.error.message).toBe('Failed to fetch submissions for heatmap');
    }
  });
}); 
 