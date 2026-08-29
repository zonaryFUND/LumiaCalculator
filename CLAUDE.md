# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概要

ゲーム **Eternal Return**（NimbleNeuron社）のキャラクターステータス・スキル/戦闘ダメージ計算を行う
React/TypeScript製SPA。`gh-pages` により `lumia-calculator.app` にデプロイされている。
このプロジェクトに関するユーザーへの応答・作業計画は日本語で行うこと（日本語ユーザー向けツールであり、
メンテナ自身も日本語で作業している）。

## リポジトリ構成

この `CLAUDE.md` が置かれているディレクトリ（以下このファイル内で `src/` と呼ぶ）自体が、
**独立したGitリポジトリ**（`origin`は`zonaryFUND/LumiaCalculator.git`）であり、GitHub上に公開されている
（2026-08-30、`git subtree`による一段上のプライベートリポジトリからの分離が完了した）。

一段上のディレクトリ（`ercalc_resources`、非公開）は、`src/`をこの`.gitignore`で無視しつつ、
`resources/`（NimbleNeuron社がファン活動用に配布している画像素材を加工したゲーム画像アセット。
再配布防止のため非公開）を管理する。ローカルでは`src/`とこの一段上のディレクトリ配下の`resources/`を
兄弟ディレクトリとして配置する（`vite.config.ts`の`resources/*`エイリアスが`../resources`を解決するため）。
この事情により、ゲームロジック・実装に関するドキュメント（この `CLAUDE.md` や `docs/` 配下）は
`resources/` を含む非公開ディレクトリ側ではなく、公開される `src/` 側に置く。逆に、画像アセットや
配布リソースの権利関係に触れる内容は `src/` 側のドキュメントに含めない。

`yarn deploy`実行時、`predeploy`スクリプト（`check-resources.ts`）が自動的に`resources/`側の
未commit・未pushを警告する（新規実験体・装備の追加時に画像素材の更新を忘れないためのサポート）。

`src/` 内でのディレクトリ構成、および以下のコマンドの実行場所は、この `CLAUDE.md` があるディレクトリを
基準とする。

```
（1段上のディレクトリ。非公開の別リポジトリ`ercalc_resources`のルート。src/はここから見てgitignoreされている）
  resources/                # webpアイコン群: armors/{arm,chest,head,leg}, skills/<subject>, subjects, weapons, weapon-skills
                             # "resources/*" エイリアス経由で読み込まれる（vite.config.ts参照）。ここ（src/）から見て ../resources に解決される
  src/                       # ← このCLAUDE.mdがあるディレクトリ（公開・独立リポジトリ`LumiaCalculator`のルート）
    package.json, vite.config.ts, tsconfig.json
    docs/                    # ゲームロジックのドメイン知識ドキュメント（status-model.md, damage-model.md 等）
    nn-api/                  # NimbleNeuronの公開APIからゲームデータを取得する、tsxで実行するスタンドアロンスクリプト群
    src/                     # 実際のアプリケーションソース（そう、src/src。viteのrootが"src"に設定されているため）
```

## コマンド

`package.json` が置かれている `src/` ディレクトリ内で実行する。

- `yarn dev` — Vite開発サーバーを起動
- `yarn build` — 型チェック（vite-plugin-checker）とビルドを実行し、`src/dist` に出力
- `yarn test` — vitestを実行（jsdom環境）。**引数なしだとwatchモードで起動し、プロセスが終了しない**ので、
  一度だけ実行して終了させたい場合は `yarn test --run` を使うこと。テストファイルは `src/test/**/*.test.{ts,tsx}`
  にある。特定ファイルのみ実行する場合は `yarn test --run <path>`、テスト名指定は `yarn test --run -t "<name>"`。
  テストをどの粒度で書くべきかは[テスト方針](docs/testing-guidelines.md)を参照。
- `yarn update-values` — `nn-api/index.ts update-values` を実行。NimbleNeuron APIからバージョン依存の
  ゲームデータ（実験体の基本ステータス、レベルアップ時ステータス、武器熟練度、武器/防具ステータス）を取得し
  `src/src/params-json/nimbleapi/*.json` に反映する
- `yarn deploy` — ビルド成果物は含まれない。`deploy.ts` を実行し `src/dist` を GitHub Pages（`gh-pages`、
  cname: `lumia-calculator.app`）に公開する。実行前に`predeploy`スクリプト（`check-resources.ts`）が
  自動的に走り、一段上の非公開ディレクトリにある`resources/`の未commit・未pushを警告する

`package.json` には含まれないが `tsx` で実行するその他のスクリプト:
- `nn-api/index.ts jp` / `nn-api/index.ts kr` — ローカライズ文字列の生データを取得し `jp.txt` / `kr.txt` に出力
- `sanitize-l10.ts` — `jp.txt` をアプリで実際に使用しているキーパターンのみに絞り込み、
  `src/intl/locales/ja/l10.json` として出力する

`nn-api/credentials.ts` と `src/credentials.ts` に、上記スクリプトが使用するNimbleNeuron APIキーが格納されている。

## アーキテクチャ

### データモデル: 実験体（キャラクター）ごとの2種類の情報源

すべての実験体には、由来の異なる2種類の数値が存在し、バランス調整パッチの反映作業ではこの区別が重要になる。

1. **APIから取得される数値** — 基本ステータス、レベルごとのステータス増加量、武器熟練度によるステータス増加量。
   これらは `src/src/params-json/nimbleapi/*.json` に格納されており、`yarn update-values` で取得する。
   これらのファイルは手動編集しない（更新は `yarn update-values` の再実行で行う想定）。
   NimbleNeuronのAPIが公開していない一部の値は、`src/src/params-json/fabricated/*.json` 以下に手動で
   記述されている（例: マイのパッシブによるDavid装備アップグレード時の差分ステータス、固有アビリティを持つ
   武器/防具のID対応と個別の効果量など）。装備ステータスのうち、APIレスポンスが小数表記（例: `0.1`）で
   返す一部のキーはゲーム内の％表記（`10`）に変換する必要があり、`equipment/status.ts`の
   `IsPercentExpressedEquipmentStatusKey()`がキー名（`Ratio`/`criticalStrike`/`ifeSteal`（大文字小文字の
   `L`/`l`両対応のためあえて先頭を欠いた部分一致）のいずれかを含むか、または`uniqueTenacity`）から
   これをヒューリスティックに判定している。新しい装備ステータスキーを扱う際はこのヒューリスティックに
   引っかかるか確認すること。
2. **手動記述のスキル/アビリティ数値** — スキルの威力係数、バフ・デバフの効果量、クールダウン、ゲージ閾値など、
   「スキルがどう機能するか」に関するすべての値は、APIが公開していないためTypeScriptで手動管理されている。
   バランス調整パッチノートの反映対象となるのはこちらである。

### 実験体ごとのスキル定義

`src/src/ingame-params/subjects/<subject_id>/` — 実験体1体につき1ディレクトリ。ディレクトリ名は英語表記
（例: `li_dailin`、`debi_marlene`）。日本語名からディレクトリ名を判別しづらいキャラクターの対応表は
`update-guide.md` を参照。各ディレクトリの構成:

- `constants.ts` — 実際に調整対象となる数値（ダメージ基本値、係数、持続時間、クールダウンなど）を、
  スキルのホットキー（`Q`/`W`/`E`/`R`）とパッシブ用の`T`をキーとして保持する。各値の意味は日本語コメントで
  記述されている。**バランス調整パッチの編集対象となるのはこのファイル。**
- `q.ts`、`w.ts`、`e.ts`、`r.ts`、`t.ts` — スキル1つにつき1ファイル。それぞれスキルの`code`と、
  `constants.ts` の値を読み込んで表示用に整形した `info`（ツールチップ定義）をエクスポートする
  （`SkillTooltipProps`、`RatioPercent` を参照）。
- `damage-table.ts` — スキルダメージを共通のダメージ計算エンジンに接続する。
- `index.ts` — 上記をまとめて `defineSubject({...})` として定義し、アプリ全体から参照される。

武器スキル（`src/src/ingame-params/weapon-skills/<weapon>/`）と装備アビリティ
（`src/src/ingame-params/equipment-abilities/<ability>/`）も同様に `constants` + `index.ts` + `tooltip.ts`
という構成だが、定数ファイルは `constants.ts` ではなく `constants.json` である。
`src/src/ingame-params/augment/`、`cube/`、`tactical-skill/`、`perpetual-outer-buffs/` にも、
それぞれの対象に対する同様の定義が置かれている。

### バランス調整パッチの反映手順

`src/update-guide.md` は、公式のバランス調整パッチノートを反映する定型作業についての指示書（日本語）である。
パッチノートのうちこのアプリに反映すべき部分（スキル・バフ・デバフの数値のみ。スキル範囲や投射物速度、
実験体の基本ステータス調整、熟練度比例ステータス調整は対応不要）と、対応する実験体ディレクトリ内の
`constants.ts` への反映方法が説明されている。この種の作業を行う際は必ず先に読むこと。
`src/12.2.md` は、実際に渡されるパッチノートの記述形式の例である。

### 計算コア

- `src/src/decimal.extension.ts` は `decimal.js` の `Decimal` にゲーム固有のヘルパー（`cut`、`floor2`、
  `round2`、`percent`、`addPercent`、`subPercent`）を拡張しており、ダメージ・ステータス計算全体で使用される。
  ゲーム側の丸め処理に合わせるため、非自明な数値計算はネイティブの浮動小数点数ではなく必ず `Decimal` を使うこと。
- `src/src/core/value-ratio/` は「あるステータスの固定値＋比率」という抽象化
  （例:「20 + 攻撃力の70%」）を定義しており、スキル定義とその評価/抽出ロジック全体で使われている。
  `calculation.ts`の`calculateValue()`が実際の計算エントリポイント（[ダメージモデル](docs/damage-model.md)参照）、
  `extraction.ts`の`extractSkillLevel()`はスキルレベル抽出（武器スキル(`origin == "D"`)は
  `config.weaponMastery`経由の特別ルートを通る点に注意）。
- `src/src/features/damage/` に、実験体の `damage-table.ts` や戦闘ページから利用されるダメージ計算・
  軽減ロジックが置かれている。Simple mode向けは`containers/simple/`、Combat mode向けは`containers/combat/`
  （エントリポイントはそれぞれ`containers/{simple,combat}/damage-table.tsx`）。会心（クリティカル）計算は
  `containers/potency-rows/critical-available.tsx`（Simple）・`containers/combat/subtables/rows/
  critical-available.tsx`（Combat）、防御力軽減・被ダメージ軽減は`containers/combat/`配下
  （`mitigation-context.ts`の`createMitigation()`、`mitigated-damage.tsx`の`mitigatedDamage()`）にある。
  Simple/Combatで行コンポーネントは別実装だが、計算ロジック（`calculateValue`・`extractMultiplier`等）は
  共有している。featureの構成全体は[features/README.md](src/features/README.md)を参照。
- ステータス計算のエントリポイントは
  `src/src/core/subject-dynamic/status/calculation.ts`の`statusOf()`。構成要素配列から
  最終値を合成する`calculateStatusValue`等は同ディレクトリの`combine-components.ts`にあり、
  合成順序（加算→乗算→上書き→クランプ→切り捨て）の詳細は
  [ステータスモデル](docs/status-model.md)の「要素の合成順序」を参照。

### アプリ構造 / UI

- `src/src/features/` — Zustand storeを使う状態を持つUI機能（`subject-config`・`subject-skills`・
  `subject-status`・`damage`）はここに置く。Storeアクセスを担う`containers/`とStoreに依存しない
  `components/`（View/Layout）を分離する方針・命名規則は[component-guidelines.md](src/features/component-guidelines.md)、
  各featureの現状は[features/README.md](src/features/README.md)を参照。
- `src/src/App.tsx` — ルートコンポーネント。`import.meta.glob` で `intl/locales/**/*.json` をすべて読み込み、
  `IntlProvider`（ロケールは `"ja"` に固定）でアプリ全体をラップし、`/` と `/simple` をSimpleページ、
  `/combat` をCombatページにルーティングする。
- `src/src/pages/simple/` と `src/src/pages/combat/` — アプリの2つのモード。前者は単一実験体の簡易ステータス
  計算、後者はより詳細な戦闘/ダメージ比較用。共通のページ枠組み（ナビゲーション、ベースレイアウト、
  レスポンシブなタブ/カラム切り替え）は `src/src/components/layout/` にある。`src/src/components/` 配下の
  構成方針（featureとの境界、各サブディレクトリの役割）は[components/README.md](src/components/README.md)を参照。
- `src/src/storage/` — `react-use` の `useLocalStorage` を用いた、保存済みビルド/プリセット/設定の永続化層。
  `storage/migration-v1/` は旧（`v2` 以前の）localStorageスキーマを新形式へ移行する処理。パターンは
  `storage/config.ts` の `useLocalStorageConfig` を参照。新規コードは現行（`v2`）形式のみを読み書きし、
  `migration-v1` の型を直接扱わないこと。
- `src/src/resources/image.ts` — `import.meta.glob` で `resources/**/*.webp` をすべて読み込み、
  実験体/武器/防具部位/スキルIDをキーとして公開する。vitestではこのモジュールが（`vitest-setup.ts` 参照）
  リクエストされたキーをそのまま返すプロキシでモックされているため、テストは実際の画像アセットに依存しない。
- パスエイリアス（`tsconfig.json` と `vite.config.ts` の両方で定義されている。変更時は両者を同期させること）:
  `@app/*` → `src/`、`components/*` → `src/components/`、`core/*` → `src/core/`、
  `util/*` → `src/util/`、`resources/*` → リポジトリルートの `resources/`、`@params-json` → `src/params-json`。

### ローカライズ

`src/src/intl/locales/<locale>/*.json` は `react-intl` のメッセージカタログ。`ja` ロケールの `l10.json` は
手書きではなく、実際のゲームの日本語ローカライズデータから `nn-api/index.ts jp` + `sanitize-l10.ts`
（上記コマンド参照）によって生成される。取り込まれるキーは `sanitize-l10.ts` 内の正規表現許可リストのみで
制御されている。
