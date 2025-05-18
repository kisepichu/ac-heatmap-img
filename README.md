# ac-heatmap-img

GitHub のユーザーページ用に、 AtCoder の提出履歴の GitHub の草風ヒートマップ画像を生成します。

## Features

- AtCoder の提出履歴を GitHub 風のヒートマップで表示
- 自動更新（GitHub Actions による定期実行）

例
<a href="https://atcoder.jp/users/kisepichu">
  <img src="https://kisepichu.github.io/ac-heatmap-img/kisepichu/2022.png" alt="AtCoder Heatmap" />
</a>

## Usage

1. このリポジトリごと [fork](https://github.com/kisepichu/ac-heatmap-img/fork) します。
2. GitHub Pages の設定を行います：
   1. リポジトリの Settings タブを開きます
   2. 左メニューから "Pages" を選択します
   3. "Build and deployment" セクションで: 
      - Source: "GitHub Actions" を選択
      - Branch: `main` を選択
   4. "Save" をクリックします
3. https://github.com/username/ac-heatmap-img/new/main?filename=config.json&value=%5B%22atcoder_id%22%5D に AtCoder のユーザー名を入力しコミットします。(atcoder_id は自分の AtCoder ユーザー名に変更してください)
4. 自分のユーザーページ (https://github.com/username/username) の README.md などに、以下のいずれかの方法で画像を埋め込みます:

```markdown
![AtCoder Heatmap](https://username.github.io/ac-heatmap-img/atcoder_id/2025.png)
```

または

```markdown
<a href="https://atcoder.jp/users/atcoder_id">
  <img src="https://username.github.io/ac-heatmap-img/atcoder_id/2025.png" alt="AtCoder Heatmap" />
</a>
```

定期的に GitHub Actions が実行されるので、画像は自動で更新されます。

## カスタマイズ

### 更新頻度の変更

デフォルトでは毎日 0 時に更新されます。変更する場合は、`.github/workflows/update.yml`の`schedule`セクションを編集してください:

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日 0 時
```

### 表示年の変更

URL の年数を変更することで、異なる年のヒートマップを表示できます。

```markdown
2022年: .../2022.png
2023年: .../2023.png
```

### 謝辞

- [AtCoder Problems API](https://github.com/kenkoooo/AtCoderProblems) - MIT License
  - 提出データの取得に利用させていただいています。

