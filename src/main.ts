import fs from 'fs/promises';
import path from 'path';
import { env } from 'process';
import { AtCoderProblemsClient } from './api/atcoder-problems-client';
import { AtCoderSubmissionRepository } from './core/repositories/atcoder-submission-repository';
import { HeatmapService } from './core/services/heatmap-service';
import { ImageGenerator } from './services/ImageGenerator';
import { FileSystemCacheManager } from './utils/cache/cache-manager';
import { logger } from './utils/logger';

async function generateHeatmapImage(
  userId: string,
  year: number,
  service: HeatmapService,
  imageGenerator: ImageGenerator
): Promise<void> {
  const outputDir = path.resolve(process.cwd(), 'dist', userId);
  const outputPath = path.resolve(outputDir, `${year}.png`);

  // 出力ディレクトリが存在しない場合は作成
  await fs.mkdir(outputDir, { recursive: true });

  // 既に画像が存在する場合はスキップ
  try {
    await fs.access(outputPath);
    logger.info(`画像が既に存在します: ${outputPath}`);
    return;
  } catch {
    // ファイルが存在しない場合は続行
  }

  // ヒートマップデータの取得
  const result = await service.generateHeatmapData(userId, year);
  if (!result.success) {
    logger.error(`ヒートマップデータの生成に失敗しました (${userId}, ${year}):`, result.error);
    return;
  }

  // 画像の生成
  try {
    await imageGenerator.generateImage(result.data, year, outputPath);
    logger.info(`画像を生成しました: ${outputPath}`);
  } catch (error) {
    logger.error(`画像の生成に失敗しました (${userId}, ${year}):`, error);
  }
}

async function main(): Promise<void> {
  // 依存関係の初期化
  const client = new AtCoderProblemsClient();
  const cacheManager = new FileSystemCacheManager();
  await cacheManager.init();

  const repository = new AtCoderSubmissionRepository(client, cacheManager);
  const service = new HeatmapService(repository);
  const imageGenerator = new ImageGenerator();

  // config.jsonの読み込み
  let userIds: string[] = [];
  try {
    if (env.NODE_ENV === 'production') {
      const configPath = path.resolve(process.cwd(), 'config.json');
      try {
        const configContent = await fs.readFile(configPath, 'utf-8');
        userIds = JSON.parse(configContent);
      } catch (error) {
        logger.info('まず README.md を見て config.json を作成してください');
        return;
      }
    } else {
      const configPath = path.resolve(process.cwd(), 'config-dev.json');
      const configContent = await fs.readFile(configPath, 'utf-8');
      userIds = JSON.parse(configContent);
    }
  } catch (error) {
    logger.error('config.jsonの読み込みに失敗しました:', error);
    process.exit(1);
  }

  // 現在の年を取得
  const currentYear = new Date().getFullYear();
  const startYear = 2014; // AtCoderの開始年

  // 各ユーザーについて処理
  for (const userId of userIds) {
    logger.info(`ユーザー ${userId} の処理を開始します...`);
    
    // 各年について処理
    for (let year = startYear; year <= currentYear; year++) {
      await generateHeatmapImage(userId, year, service, imageGenerator);
    }
  }
}

main().catch((error) => {
  logger.error('予期せぬエラーが発生しました:', error);
  process.exit(1);
});
