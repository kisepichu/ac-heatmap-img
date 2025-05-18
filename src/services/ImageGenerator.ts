import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { HeatmapData } from '../core/types/heatmap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ImageGenerator {
  /**
   * ヒートマップ画像を生成する
   * @param data ヒートマップデータ
   * @param year 対象年
   * @param outputPath 出力先のパス
   */
  async generateImage(data: HeatmapData, year: number, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
      const page = await browser.newPage();

      // テンプレートHTMLを読み込む
      const templatePath = path.resolve(__dirname, '../templates/heatmap.html');
      await page.goto(`file://${templatePath}`);

      // 必要なスクリプトを注入
      const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

      // D3.js (cal-heatmapの依存関係)
      const d3Path = path.resolve(nodeModulesPath, 'd3/dist/d3.min.js');
      const d3Script = await fs.readFile(d3Path, 'utf-8');
      await page.addScriptTag({ content: d3Script });

      // cal-heatmap
      const calHeatmapPath = path.resolve(nodeModulesPath, 'cal-heatmap/dist/cal-heatmap.min.js');
      const calHeatmapScript = await fs.readFile(calHeatmapPath, 'utf-8');
      await page.addScriptTag({ content: calHeatmapScript });

      // cal-heatmap CSS
      const calHeatmapCssPath = path.resolve(nodeModulesPath, 'cal-heatmap/dist/cal-heatmap.css');
      const calHeatmapCss = await fs.readFile(calHeatmapCssPath, 'utf-8');
      await page.addStyleTag({ content: calHeatmapCss });

      // ビューポートサイズを設定
      await page.setViewport({
        width: 686,
        height: 200,
        deviceScaleFactor: 2, // Retina相当の解像度
      });

      // データを注入してヒートマップを描画
      await page.evaluate(`window.renderHeatmap(${JSON.stringify(data)}, ${year})`);

      // 描画が完了するまで待機
      await page.waitForSelector('.ch-container');
      await new Promise((resolve) => setTimeout(resolve, 1000)); // アニメーション等の完了を待つ

      // ヒートマップ要素を特定して画像として保存
      const element = await page.$('#heatmap');
      if (!element) {
        throw new Error('ヒートマップ要素が見つかりませんでした');
      }

      // 出力ディレクトリが存在しない場合は作成
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      await element.screenshot({
        path: outputPath,
        omitBackground: true, // 背景を透過
      });
    } finally {
      await browser.close();
    }
  }
}
