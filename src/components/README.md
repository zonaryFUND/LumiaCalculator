# components/ ディレクトリについて

`src/components/`は、特定のfeatureに紐付かない**feature横断の共通部品**を置く場所。

## `features/`との境界

「何を`components/`に置き、何を`features/<feature>/`に置くか」の判断基準は
[../features/component-guidelines.md](../features/component-guidelines.md)の「`src/components/`との境界」節を参照。
要約すると、次の**いずれか**を満たすものだけがここに置かれる。

1. **ドメイン非依存** — `SubjectConfig`・`Status`・`EquipmentID`のようなゲーム固有の型を知らない、汎用的なUI部品
2. **ドメインには依存するが、実際に複数featureから使われている**

どちらも満たさない（特定のfeatureでしか使われておらず、そのfeatureのドメイン型に強く依存している）ものは、
過去にここへ置かれていたことがあっても、見つけ次第該当`features/<feature>/`側へ移すべき
（2026-08-29に`item/`・`modal/`・`config/`・`slider/`を整理した際の判断基準がこれ）。

## サブディレクトリ

### `common/`

ドメイン非依存の汎用UI部品。フラットに並んでいる（サブディレクトリでさらに分類していない）。

- `switch.tsx` / `pull-down.tsx` / `segmented-control.tsx` / `gauge-slider.tsx` — 入力系の部品
- `table-row.tsx` / `table.module.styl` / `inner-table.tsx` — テーブル表示系の部品
- `formatted-text.tsx` — テキスト整形

### `layout/`

アプリ全体のシェル（見た目の骨格）・レスポンシブな配置ロジックを担う。「featureの中身」ではなく
「featureをどこにどう置くか」を決めるためのものなので、`common/`とは別に分類している。

- `base/` — PC/モバイルでのメイン領域のレイアウト（`App.tsx`がルートで1回だけ使う`Base`、
  各ページが見出し込みのラッパーとして使う`Content`）
- `navigation/` — 左サイドバー（PC）・上部バー+ハンバーガーメニュー（モバイル）などのグローバルナビゲーション
- `pane/` — PCでは横並びカラム、モバイルではスワイプ切り替え式のタブ、というレスポンシブな内容分割を行う。
  `Pane`（1区画の中身）・`TabSelector`（モバイル専用の切り替えボタン列。`Pane`とは独立して汎用的な部品だが
  現状`CollapsiblePanes`の内部実装としてのみ使われている）・`CollapsiblePanes`（両者を組み合わせる司令塔。
  PCでは単純にflexで横並びにするだけ）の3つで構成される

### `tooltip/`

スキル・装備のホバー/タップツールチップ。`subject-skills`（スキルアイコン）と`subject-config`（装備アイコン）の
両方から使われる、ドメインには依存するが複数featureをまたぐ例外的な部品（上記の判断基準2に該当）。

react-tooltipのhover描画がDOM要素の`data-tooltip-*`属性しか参照できない制約から、対戦モードで
「どちら側の実験体か」を伝えるために`subject-side-context.ts`（`TooltipSubjectSideContext`）という
補助Contextを持つ。詳細は[../features/README.md](../features/README.md)のsubject-skills節を参照。

## ここにないもの

- Reactに依存しない汎用関数（文字列操作など）は`components/`ではなく`src/util/`に置く
  （例: `ignore-pseudo-tag.ts`）
- feature・コンポーネントを問わず使う横断的なReact Hookは`components/`ではなく`src/hooks/`に置く
  （例: `use-responsive-ui-type.ts`）。`util/`と対をなす「種類別（by-kind）」のディレクトリで、
  `components/`・`features/`とは並列の関係にある
