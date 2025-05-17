import path from 'path';
import { AtCoderProblemsClient } from './api/atcoder-problems-client';
import { AtCoderSubmissionRepository } from './core/repositories/atcoder-submission-repository';
import { HeatmapService } from './core/services/heatmap-service';
import { ImageGenerator } from './services/ImageGenerator';
import { FileSystemCacheManager } from './utils/cache/cache-manager';
import { logger } from './utils/logger';

async function main(): Promise<void> {
  // 仮のパラメータ
  const userId = 'kisepichu';
  const year = 2022;
  const outputPath = path.resolve(process.cwd(), 'dist', userId, `${year}.png`);

  // 依存関係の初期化
  const client = new AtCoderProblemsClient();
  const cacheManager = new FileSystemCacheManager();
  await cacheManager.init();

  const repository = new AtCoderSubmissionRepository(client, cacheManager);
  const service = new HeatmapService(repository);
  const imageGenerator = new ImageGenerator();

  // ヒートマップデータの取得
  const result = await service.generateHeatmapData(userId, year);
  if (!result.success) {
    logger.error('ヒートマップデータの生成に失敗しました:', result.error);
    return;
  }

  // 画像の生成
  try {
    await imageGenerator.generateImage(result.data, year, outputPath);
    logger.info(`画像を生成しました: ${outputPath}`);
  } catch (error) {
    logger.error('画像の生成に失敗しました:', error);
  }
}

main().catch((error) => {
  logger.error('予期せぬエラーが発生しました:', error);
});
