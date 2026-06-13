# Naka — 大学専用匿名キャンパスアプリ

## Current beta build

This repo now contains the static app, a Capacitor iOS wrapper, and Week 1-3 product scaffolding.

Implemented for local beta testing:

- University email domain gate
- Persistent local feed, comments, votes, reports, blocks, moderation queue, beta invites, class reviews, and market items
- Admin queue for pending posts and reports
- In-app posting rules, privacy, terms, support, and account deletion request surfaces
- Supabase schema, RLS policies, seed data, and moderation edge function scaffold
- Capacitor iOS project at `ios/App/App.xcodeproj`

Run locally:

```sh
npm install
npm run start
```

Sync and open iOS:

```sh
npm run sync:ios
npm run open:xcode
```

Validate:

```sh
npm run check
```

Execution notes live in `docs/WEEK_1_TO_3_EXECUTION.md`.

Naka は、大学メールで認証された学生だけが使える、大学別の匿名キャンパスコミュニティです。授業・履修・サークル・就活・バイト・売買・愚痴・質問など、大学生活で本当に必要な情報を、名前を出さずに共有できます。

コンセプトは **「大学専用の匿名 Threads。ただし中身は履修・募集・売買までできるキャンパス OS」** です。

---

## 1. プロダクト概要

### 目的

大学ごとに閉じた匿名コミュニティを作り、学生が以下のような情報を安全に共有できるようにします。

- 授業・履修の評判
- 出席、課題、テスト、楽単情報
- サークル・インカレ・イベント募集
- 就活・インターン情報
- 教科書、家具、チケットなどの売買
- キャンパス内のリアルタイム情報
- 匿名の質問・相談・愚痴

### ターゲット

- 大学生
- 大学院生
- インカレ・サークル運営者
- 学生団体
- 学生起業家・インターン採用企業

### 初期ユーザー

最初は 1 大学に絞って立ち上げます。おすすめは、学生数が多く、キャンパス内外のコミュニティ活動が活発な大学です。

例:

- 早稲田大学
- 慶應義塾大学
- 明治大学
- 青山学院大学
- 立教大学
- 東京大学
- 法政大学
- 中央大学

---

## 2. UI 方針

### 寄せる UI

- **フィード:** Threads / X
- **カテゴリ構造:** Discord
- **リアル感:** BeReal
- **実用性:** メルカリ + 大学掲示板
- **安心感:** LINE オープンチャットより厳しめ

### 避ける UI

- 5ch / 爆サイ系の見た目
- 古い掲示板 UI
- Reddit 的な重いスレッド構造
- Instagram 的なキラキラしすぎる世界観

### デザイン原則

- 白背景、角丸カード、軽い影
- 絵文字ベースのカテゴリ表示
- 匿名だけど陰湿に見えない
- 投稿前にカテゴリを選ばせる
- 個人攻撃・晒しを投稿前に止める
- 初見でも説明なしで使える

---

## 3. 主要機能

### MVP で入れる機能

1. 大学メール認証
2. 大学別フィード
3. 匿名投稿
4. コメント
5. Upvote / Downvote
6. 投稿カテゴリ
7. 授業レビュー
8. 募集・売買
9. 通報
10. AI モデレーション
11. アカウント停止 / 投稿非表示

### 追加で入れたい機能

- 半匿名 DM
- 投稿ベースの DM リクエスト
- 履修登録シーズンの授業ランキング
- 教科書売買
- サークル新歓ページ
- インターン・バイト募集
- 大学横断のトレンド表示
- 通知
- 保存機能
- 認証済みサークルアカウント

---

## 4. 画面構成

### ログイン画面

目的は、大学メールで認証することで「同じ大学の人だけがいる安心感」を出すことです。

表示要素:

- サービスロゴ
- キャッチコピー
- 大学メール入力欄
- 認証ボタン
- 匿名性と安全性の説明

コピー例:

```txt
大学のリアルを、名前なしで。
授業・サークル・就活・売買・今日のキャンパス。
同じ大学の人だけが見れる匿名掲示板。
```

### ホーム画面

大学ごとの匿名フィードです。

タブ:

- Hot
- 新着
- 質問
- 近く

カテゴリ:

- 全部
- 授業
- サークル
- 恋愛
- 就活
- 売買
- バイト
- 愚痴
- イベント

### 授業画面

履修登録の時期に開かれるキラー機能です。

表示要素:

- 授業名検索
- 教授名検索
- 楽単スコア
- 出席情報
- 課題量
- テスト形式
- レビュー
- 過去の質問

### 募集・売買画面

大学内の安全なマーケットプレイスです。

カテゴリ例:

- 教科書
- 家具
- チケット
- サークル募集
- イベント募集
- インターン募集
- バイト募集
- 学生エンジニア募集

### 投稿画面

投稿前にカテゴリを必ず選ばせます。これは治安維持と検索性のために重要です。

投稿時の流れ:

1. カテゴリ選択
2. 本文入力
3. AI モデレーション
4. 問題がなければ投稿
5. 危険な内容なら修正依頼

### 治安・ルール画面

匿名 SNS で一番重要な画面です。

禁止事項:

- 個人名晒し
- 顔写真晒し
- LINE ID / 電話番号 / 住所の晒し
- 性的な噂
- 犯罪の断定
- 誹謗中傷
- 教授・学生への人格攻撃
- 差別表現
- ストーカー的な投稿

許可する投稿:

- 授業の質問
- 履修相談
- 就活相談
- サークル募集
- イベント募集
- 売買
- 大学生活の愚痴
- キャンパス内のリアルタイム情報

---

## 5. 推奨技術スタック

### フロントエンド

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### バックエンド

- Supabase
  - Auth
  - PostgreSQL
  - Row Level Security
  - Storage
  - Realtime

### AI モデレーション

- OpenAI API などの LLM
- 投稿前チェック
- 通報後の再判定
- 個人情報検知
- 誹謗中傷検知

### ホスティング

- Vercel
- Supabase

---

## 6. 推奨ディレクトリ構成

```txt
naka-app/
  app/
    page.tsx
    login/
      page.tsx
    home/
      page.tsx
    classes/
      page.tsx
    market/
      page.tsx
    profile/
      page.tsx
  components/
    PostCard.tsx
    ComposeModal.tsx
    BottomNav.tsx
    CategoryTabs.tsx
    SafetyNotice.tsx
    ClassCard.tsx
    MarketCard.tsx
  lib/
    supabase.ts
    moderation.ts
    university.ts
  types/
    post.ts
    user.ts
    university.ts
  supabase/
    schema.sql
    policies.sql
  public/
    logo.svg
  README.md
```

---

## 7. データベース設計案

### users

```sql
create table users (
  id uuid primary key,
  university_id uuid references universities(id),
  email text unique not null,
  display_name text,
  role text default 'student',
  status text default 'active',
  created_at timestamp with time zone default now()
);
```

### universities

```sql
create table universities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email_domain text not null,
  created_at timestamp with time zone default now()
);
```

### posts

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities(id),
  user_id uuid references users(id),
  category text not null,
  body text not null,
  status text default 'visible',
  hot_score integer default 0,
  comment_count integer default 0,
  created_at timestamp with time zone default now()
);
```

### comments

```sql
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  user_id uuid references users(id),
  body text not null,
  status text default 'visible',
  created_at timestamp with time zone default now()
);
```

### votes

```sql
create table votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  post_id uuid references posts(id),
  value integer not null,
  created_at timestamp with time zone default now(),
  unique(user_id, post_id)
);
```

### class_reviews

```sql
create table class_reviews (
  id uuid primary key default gen_random_uuid(),
  university_id uuid references universities(id),
  user_id uuid references users(id),
  class_name text not null,
  professor_name text,
  easy_score numeric,
  attendance text,
  assignment_load text,
  exam_format text,
  body text,
  created_at timestamp with time zone default now()
);
```

### reports

```sql
create table reports (
  id uuid primary key default gen_random_uuid(),
  reporter_user_id uuid references users(id),
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);
```

---

## 8. モデレーション設計

匿名 SNS なので、モデレーションは MVP 段階から必須です。

### 投稿前チェック

投稿前に以下を検知します。

- 個人名らしき表現
- 電話番号
- メールアドレス
- LINE ID
- Instagram ID
- 住所
- 顔写真・人物画像
- 誹謗中傷
- 性的な噂
- 犯罪の断定
- 差別表現

### 投稿ステータス

```txt
visible       表示中
hidden        非表示
pending       人間確認待ち
blocked       投稿拒否
deleted       削除済み
```

### 危険投稿時の UX

危険な投稿をいきなり送信失敗にするだけでなく、修正を促します。

例:

```txt
個人を特定できる表現が含まれている可能性があります。
名前・連絡先・顔写真・噂の断定を削除してから投稿してください。
```

---

## 9. 大学メール認証

大学ごとに許可ドメインを設定します。

例:

```txt
waseda.jp
keio.jp
u-tokyo.ac.jp
meiji.ac.jp
aoyama.ac.jp
rikkyo.ac.jp
```

ログイン時の流れ:

1. メールアドレス入力
2. ドメインチェック
3. Magic Link 送信
4. 認証完了
5. university_id を user に紐づけ
6. 該当大学のフィードに遷移

---

## 10. MVP 開発ステップ

### Phase 1: 静的プロトタイプ

現在の `index.html` をベースに UI を確認します。

- ログイン風画面
- フィード
- 授業画面
- 募集・売買画面
- 投稿モーダル
- 治安ルール

### Phase 2: Next.js 化

- コンポーネント分割
- ルーティング
- Tailwind CSS 導入
- スマホファースト UI

### Phase 3: Supabase 接続

- Auth
- posts
- comments
- votes
- universities
- class_reviews
- reports

### Phase 4: モデレーション実装

- 投稿前 AI チェック
- 通報機能
- 非表示処理
- 管理者画面

### Phase 5: 1 大学でクローズドβ

- 最初は 1 大学だけで開始
- 招待リンク制
- 学生 100〜300 人で検証
- 履修登録・新歓などのタイミングに合わせてローンチ

---

## 11. 初期 KPI

### アクティベーション

- 大学メール認証完了率
- 初回投稿率
- 初回コメント率
- 初回 upvote 率

### エンゲージメント

- DAU
- WAU
- 投稿数 / 日
- コメント数 / 日
- 1 ユーザーあたり閲覧回数
- 授業検索数
- 売買投稿数

### 健全性

- 通報率
- 投稿非表示率
- ブロック投稿率
- 再投稿修正率
- 退会率

### PMF に近い指標

- 履修登録期間中の再訪率
- 「この授業どう？」系投稿への返信速度
- 大学内での招待経由登録率
- 1 ユーザーあたり招待数

---

## 12. グロース仮説

### 初期の勝ち筋

最初のキラー機能は、SNS ではなく **履修・楽単・授業レビュー** です。

大学生が必ず必要とする情報から入って、その後にフィード、サークル、売買、愚痴、恋愛へ広げます。

### 初期導線

- 履修登録シーズン
- 新歓シーズン
- サークル募集
- 教科書売買
- インターン募集
- キャンパス内イベント

### コピー例

```txt
同じ大学の人だけが見れる、匿名キャンパス掲示板。
授業、サークル、就活、恋愛、愚痴、売買。
名前を出さずに、大学のリアルが見える。
```

---

## 13. ローカルでの確認方法

現在のプロトタイプは静的 HTML です。

```bash
open index.html
```

または VS Code の Live Server などで開いてください。

```bash
npx serve .
```

---

## 14. 注意点

このプロダクトは匿名性を扱うため、機能よりも先に安全設計が重要です。

特に以下は MVP でも必ず入れるべきです。

- 大学メール認証
- 投稿前モデレーション
- 通報
- 非表示
- アカウント停止
- 管理者確認画面
- 利用規約
- プライバシーポリシー

匿名だから伸びる一方で、匿名だから荒れます。日本版では「毒が吐ける」よりも「本音が出せるけど怖くない」を優先します。

---

## 15. 現在のプロトタイプ内容

このリポジトリには、以下の画面を含む静的プロトタイプがあります。

- 大学メール認証風ログイン
- 大学別匿名フィード
- Hot / 新着 / 質問 / 近く タブ
- カテゴリチップ
- 投稿カード
- 授業レビュー画面
- 募集・売買画面
- プロフィール / ルール画面
- 投稿モーダル
- 簡易安全表示
