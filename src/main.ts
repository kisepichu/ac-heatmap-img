import fs from 'fs/promises';
import path from 'path';
import { env } from 'process';
import { AtCoderProblemsClient } from './api/atcoder-problems-client';
import { AtCoderSubmissionRepository } from './core/repositories/atcoder-submission-repository';
import { HeatmapService } from './core/services/heatmap-service';
import { ImageGenerator } from './services/ImageGenerator';
import { Config } from './types/config';
import { FileSystemCacheManager } from './utils/cache/cache-manager';
import { logger } from './utils/logger';

async function generateHeatmapImage(
  userId: string,
  year: number,
  theme: Config['theme'],
  service: HeatmapService,
  imageGenerator: ImageGenerator
): Promise<void> {
  const outputDir = path.resolve(process.cwd(), 'dist', userId);
  const outputPath = path.resolve(outputDir, `${year}.png`);
  const currentYear = new Date().getFullYear();

  // 出力ディレクトリが存在しない場合は作成
  await fs.mkdir(outputDir, { recursive: true });

  // 現在の年でない場合のみ、既存の画像をスキップ
  if (year !== currentYear) {
    try {
      await fs.access(outputPath);
      logger.info(`画像が既に存在します: ${outputPath}`);
      return;
    } catch {
      // ファイルが存在しない場合は続行
    }
  }

  // ヒートマップデータの取得
  const result = await service.generateHeatmapData(userId, year);
  if (!result.success) {
    logger.error(`ヒートマップデータの生成に失敗しました (${userId}, ${year}):`, result.error);
    return;
  }

  // 現在の年で、かつ画像が既に存在する場合は、新しい提出があるかチェック
  if (year === currentYear) {
    try {
      await fs.access(outputPath);
      logger.info(`現在の年(${year})の画像を更新します: ${outputPath}`);
    } catch {
      // ファイルが存在しない場合は何もしない
    }
  }

  // 画像の生成
  try {
    await imageGenerator.generateImage(result.data, year, theme, outputPath);
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
  let config: Config;
  try {
    const configPath = path.resolve(
      process.cwd(),
      env.NODE_ENV === 'production' ? 'config.json' : 'config-dev.json'
    );
    try {
      const configContent = await fs.readFile(configPath, 'utf-8');
      config = JSON.parse(configContent);
    } catch (error) {
      logger.error('設定ファイルの読み込みに失敗しました:', error);
      if (env.NODE_ENV === 'production') {
        logger.info('まず README.md を見て config.json を作成してください');
      }
      return;
    }
  } catch (error) {
    logger.error('設定ファイルの読み込みに失敗しました:', error);
    process.exit(1);
  }

  // 現在の年を取得
  const currentYear = new Date().getFullYear();

  // 各ユーザーについて処理
  for (const userId of config.users) {
    logger.info(`ユーザー ${userId} の処理を開始します...`);

    // ユーザーの最初の提出年を取得
    const firstYearResult = await repository.getFirstSubmissionYear(userId);
    if (!firstYearResult.success) {
      logger.error(`ユーザー ${userId} の最初の提出年の取得に失敗しました:`, firstYearResult.error);
      continue;
    }

    const startYear = firstYearResult.data;
    logger.info(`ユーザー ${userId} の最初の提出は ${startYear} 年です`);

    // 各年について処理
    for (let year = startYear; year <= currentYear; year++) {
      await generateHeatmapImage(userId, year, config.theme, service, imageGenerator);
    }
  }
}

main().catch((error) => {
  logger.error('予期せぬエラーが発生しました:', error);
  process.exit(1);
});
