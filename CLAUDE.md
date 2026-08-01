# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**Claude マスターアプリ（app-app）** — Claudeでのアプリ作成手順を、目次形式でまとめる個人用ナレッジアプリ。

- Target: 自分専用（外部公開・外部連携なし）
- Core Problem: Claudeを使ったアプリ開発の手順が散在しており、必要な情報だけをまとめて参照したい
- Goal: 目次から必要な手順・プロンプトにすぐアクセスできる状態にする
- GitHubリポジトリ: https://github.com/mhtanaka17-collab/app-app.git

## 技術スタック

- HTML
- CSS
- JavaScript（フレームワークなし / Vanilla JS）
- ビルドツール・パッケージマネージャーなし（静的ファイルのみで動作）

## アーキテクチャ

SPA構成。`index.html` 1枚の中で目次とページ内容を切り替え、URLハッシュ（例: `#unit1-chapter1-page1`）で表示位置を管理する。

```
app-app/
├── index.html          # 目次画面（トップ）兼ページ表示コンテナ
├── css/
│   └── style.css       # 白ベース・清潔感のあるデザイン
├── js/
│   ├── data.js          # コンテンツデータ（ユニット→章→ページ）
│   ├── router.js        # 目次描画・ページ遷移（前へ/次へ）ロジック
│   └── main.js          # 初期化処理
├── CLAUDE.md
└── .gitignore
```

## データ構造

コンテンツは `js/data.js` にJSオブジェクトとして保持する（DBなし、テキスト情報のみ）。

```
CONTENT.units[]
  - id, title
  - chapters[]
    - id, title
    - pages[]
      - id, title, body（人間が手作業でする時の手順）, prompt（Claudeに投げるプロンプト例）
```

## 画面仕様

- 目次（ユニット→章→ページ）から任意のページを開く
- 各ページ末尾に「前へ」「次へ」ボタンで前後のページに遷移
- Claudeの操作手順をプロンプト付きで表示

## 開発時の注意

- **セキュリティ最優先**：外部API・外部サービスとは一切連携しない。すべて静的ファイル・ローカル完結。
- 機密情報（APIキー・パスワード等）をコンテンツデータや履歴に含めないこと。
- コードスタイルや命名規則などのルールが定まったら、このファイルに追記すること。
