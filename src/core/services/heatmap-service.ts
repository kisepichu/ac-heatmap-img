import { formatDate, unixTimeToJstDate } from '../../utils/date/timezone';
import { SubmissionRepository } from '../repositories/submission-repository';
import { HeatmapData } from '../types/heatmap';
import { AppError, Result, err, ok } from '../types/result';
import { Submission } from '../types/submission';

export class HeatmapService {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  /**
   * 指定された年のヒートマップデータを生成する
   */
  async generateHeatmapData(userId: string, year: number): Promise<Result<HeatmapData>> {
    // 提出データを取得
    const submissionsResult = await this.submissionRepository.fetchUserSubmissions(userId, year);
    if (!submissionsResult.success) {
      return err(new AppError('Failed to fetch submissions for heatmap', submissionsResult.error));
    }

    // 日付ごとの提出をカウント
    const heatmapData = this.countSubmissionsByDate(submissionsResult.data);

    return ok(heatmapData);
  }

  /**
   * 提出を日付ごとにカウントする
   */
  private countSubmissionsByDate(submissions: Submission[]): HeatmapData {
    const heatmapData: HeatmapData = {};

    for (const submission of submissions) {
      const date = formatDate(unixTimeToJstDate(submission.epoch_second));

      // 日付のエントリがなければ初期化
      if (!(date in heatmapData)) {
        heatmapData[date] = {
          acCount: 0,
          nonAcCount: 0,
        };
      }

      // 提出の種類に応じてカウントを増やす
      if (submission.result === 'AC') {
        heatmapData[date].acCount++;
      } else {
        heatmapData[date].nonAcCount++;
      }
    }

    return heatmapData;
  }
}
