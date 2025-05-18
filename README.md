# ac-heatmap-img

GitHub のユーザーページ用に、 AtCoder の提出履歴の GitHub の草風ヒートマップ画像を生成します。

## Features

- AtCoder の提出履歴を GitHub 風のヒートマップで表示
- 自動更新（GitHub Actions による定期実行）

例
![AtCoder Heatmap](https://kisepichu.github.io/ac-heatmap-img/light_default.png)

## Usage

1. このリポジトリを [fork](https://github.com/kisepichu/ac-heatmap-img/fork) します。
2. https://github.com/username/ac-heatmap-img/new/main?filename=config.json&value=%7B%22users%22%3A%5B%22atcoder_id%22%5D%2C%22theme%22%3A%7B%22mode%22%3A%22light_default%22%7D%7D を開き、url の username を自分の GitHub ユーザー名に変更し、出てきたエディタで AtCoder のユーザー名を入力しコミットします。
3. 自分のユーザーページ (https://github.com/username/username) の README.md などに、以下のいずれかの方法で画像を埋め込みます:

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

## テーマ一覧

- Light Default

![Light Default](https://kisepichu.github.io/ac-heatmap-img/light_default.png)

- Light High Contrast

![Light High Contrast](https://kisepichu.github.io/ac-heatmap-img/light_high_contrast.png)

- Light Protanopia Deuteranopia

![Light Protanopia Deuteranopia](https://kisepichu.github.io/ac-heatmap-img/light_protanopia_deuteranopia.png)

- Light Tritanopia

![Light Tritanopia](https://kisepichu.github.io/ac-heatmap-img/light_tritanopia.png)

- Dark Default

![Dark Default](https://kisepichu.github.io/ac-heatmap-img/dark_default.png)

- Dark High Contrast

![Dark High Contrast](https://kisepichu.github.io/ac-heatmap-img/dark_high_contrast.png)

- Dark Protanopia Deuteranopia

![Dark Protanopia Deuteranopia](https://kisepichu.github.io/ac-heatmap-img/dark_protanopia_deuteranopia.png)

- Dark Tritanopia

![Dark Tritanopia](https://kisepichu.github.io/ac-heatmap-img/dark_tritanopia.png)

- Dark Dimmed

![Dark Dimmed](https://kisepichu.github.io/ac-heatmap-img/dark_dimmed.png)

- ChatGPT Purple

![ChatGPT Purple](https://kisepichu.github.io/ac-heatmap-img/chat_gpt_purple.png)

- Cursor Matrix

![Cursor Matrix](https://kisepichu.github.io/ac-heatmap-img/cursor_matrix.png)

- Cursor Nord

![Cursor Nord](https://kisepichu.github.io/ac-heatmap-img/cursor_nord.png)

- ChatGPT Pastel Dreams

![ChatGPT Pastel Dreams](https://kisepichu.github.io/ac-heatmap-img/chat_gpt_pastel_dreams.png)

- ChatGPT Matcha Mocha

![ChatGPT Matcha Mocha](https://kisepichu.github.io/ac-heatmap-img/chat_gpt_matcha_mocha.png)

- ChatGPT Midnight Neon

![ChatGPT Midnight Neon](https://kisepichu.github.io/ac-heatmap-img/chat_gpt_midnight_neon.png)
