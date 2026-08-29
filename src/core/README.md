# core/ ディレクトリについて

このディレクトリ（旧`types/app-types/`。命名の経緯は課題1参照）には、実験体・装備・スキルの型定義に加えて、
静的データの構築処理（`equipment/dictionary.ts`、`subject-static/mastery.ts`等）やステータス・ダメージ計算
ロジック（`subject-dynamic/status/calculation.ts`の`statusOf()`、`value-ratio/calculation.ts`の
`calculateValue()`等）まで、この計算機の型・静的データ・計算エンジンの基盤が置かれている。個々の実験体・
スキル・バフ効果量といった「実験体固有のドメイン知識」は`ingame-params/`側にあり、このディレクトリはそれらが
乗っかる土台という位置付け。

以下は、バフ・デバフ計算機能（[known-issues.md](../../docs/known-issues.md)参照。実装自体は直近の目標ではないが、
ステータス計算の合成順序において影響する箇所は先に把握・予約しておく必要がある）の検討に向けて
`equipment` / `skill` / `subject-static` / `subject-dynamic` を見直した際に見つかった課題のログ。

## 課題リスト

### 1. ~~ディレクトリ命名: `app-types`という名称が実態と合っていない~~（対応済み）

旧`app-types/`配下には「型」というより静的データの構築処理・計算ロジックが多く含まれ、初見で「型定義だけが
置かれている」と誤解しやすかった。また旧`types/app-types/`という2段の入れ子も、`types/`が実質この1つの
子ディレクトリしか持たず冗長だった。

検討の結果、`domain/`は「この計算機におけるドメイン知識」が`ingame-params/`側にも広がっており実態と齟齬が
出るため採用せず、「他のドメイン固有コードが依拠する基盤」であることを表す`core/`を採用。`types/`ごと
フラット化し、`src/types/app-types/` → `src/core/`へ移動した。パスエイリアスも`app-types/*` → `core/*`に
変更した（`tsconfig.json`・`vite.config.ts`）。影響ファイル数が多い機械的な置換だったため、実施はこの1回で
完了させた。

### 2. ~~`StatusValueComponent.origin`の命名規則が不統一~~（対応済み）

`subject-dynamic/status/value-component/component.ts:12-17` — コメント上の`` `perpetual-status` ``（ハイフン
区切り）のtypoを実際のリテラルである`` `perpetual_status` ``（アンダースコア区切り）に修正。また
`` `base-with-weapon` ``の説明行は、当初は必要と考えていたが後に不要と判断された過去の検討の残骸だったため削除した。

### 3. `calculationType: "fix"`（値の上書き）は`perpetual_status`経由では実戦投入済み、`temporary-status`経由は未着手

`status/combine-components.ts`の`calculateStatusValue` / `calculateCooldownValue` / `calculateMovementSpeedValue`は
いずれも`fix`タイプのcomponentを正しく畳み込む実装になっている（複数ある場合は最後に適用されたものが優先。
[status-model.md](../../docs/status-model.md)の「要素の合成順序」の4番目にあたる）。**この畳み込み自体は
未使用の予約機能ではなく、`origin: "perpetual_status"`（実験体定義に静的に書き込まれる恒久パッシブ効果）と
組み合わせて既に本番で使われている**。例: `ingame-params/subjects/nathapon/perpetual-status.ts`は、装備に
依らず攻撃速度を一定値に固定するパッシブを`{origin: "perpetual_status", calculationType: "fix", ...}`で表現
している（同様の固定要素を持つ実験体は他に`adela`・`tsubame`・`karla`・`hisui`・`bernice`が存在。
`grep -rn 'calculationType: "fix"' src/ingame-params`で確認可能）。

一方、`origin: "temporary-status"`（ユーザーが任意にオン/オフを切り替えられるバフ・デバフ入力）側からの
`fix`注入経路はまだ存在しない。バフ・デバフ実装の際、計算コア自体（`combine-components.ts`）に手を入れる
必要は薄く、「バフ定義 → `StatusValueComponent`（`origin: "temporary-status"`、
`calculationType: "sum" | "mul" | "fix"`）への変換」を作ればよい設計になっている。

**予約事項（直近でバフ・デバフに着手しない場合でも）**: ステータス計算の合成順序（加算→乗算→上書き→クランプ→
切り捨て）に手を入れる変更を行う際は、この`fix`の畳み込み位置（乗算適用後・クランプ前）を崩さないこと。特に
`perpetual_status`経由の既存の`fix`利用（上記6実験体）を壊さないよう注意する。

> バフ・デバフ計算機能の実装に着手した（`buff-debuff-spec.md`参照）。以下4・5・6は着手に伴い対応済み。
> 進行中のタスクはStep 2の末尾に記載。

### 4. ~~`config.perpetualOuterBuffs`は宣言のみで未接続~~（対応済み、バフ・デバフ実装Step 1）

`buff-debuff-spec.md`（ユーザー作成の要件定義）のレビュー・質疑応答を経て、バフ・デバフ実装Step 1として
`perpetualOuterBuffs: PerpetualOuterBuff[]`を`selfBuffs` / `incomingBuffs: BuffDebuffState[]`
（`subject-dynamic/config/buff-debuff-state.ts`）に置き換えた。

- `BuffDebuffState = {id: string, stack: number}`。`id`単独では発生源
  （実験体スキル/装備アビリティ/特性）を判別できないが、`selfBuffs`/`incomingBuffs`のどちらの配列に
  含まれるかで自己／他者は区別済みなので問題ない。同一`id`を持つ要素が配列内に複数存在しうる
  （例: 複数の発生源から同時にスロウを受ける）ため、dedupを前提にした実装をしないこと。
  当初`stack: number | string`としていたが（旧`力の蓄積`の文字列キー`"day.1.noon"`を参照した判断）、
  仕様書の「切り替え式バフ」は内部的には0/1の数値IDで表現しラベル表示のみIntl側で解決する設計と判明し、
  Step 2で`number`のみに絞り込んだ。
- **Step 1の時点ではデータ構造と永続化のみ**（`storage/migration-v1/config.ts`の`Migrate()`・
  `features/subject-config/store.tsx`のZustand `persist`の`merge`・`storage/preset.ts`の移行分岐、
  いずれも`SubjectConfigDefault`で既存データの欠落フィールドを補うようにした）。「カタログ定義」の型・
  `statusOf()`への注入ロジックは項目5参照。

### 5. ~~現行`buff-debuff/type.ts`は型として未成熟~~（対応済み、バフ・デバフ実装Step 2）

未接続・未成熟だった旧`core/buff-debuff/type.ts`（どこからも参照されていなかったことをgrepで確認済み）を
削除し、`ingame-params/buff-debuff/type.ts`に`BuffDebuffOrigin`（`"skill" | "equipment-ability" |
"augment"`の判別タグ）と`SelfBuffDefinition`（`nameIntlID`・`availableStacks: number[]`・
`buff: (stack) => Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent>>`）を
新設した。自己バフの削除可否は`origin === "augment"`から導出する設計のため、独立した`removable`フィールドは
持たない。

配線: `ingame-params/subjects/type.ts`の`SubjectModules`に`buffDebuff?: SubjectSelfBuffDebuff`を追加し、
`dictionary.ts`の`SubjectBuffDebuffDictionary`（`SubjectCode`キー）で集約。実験体スキルによるバフ効果は
スキルレベル等によって内容が変化しうるため、`buffDebuff`は`Record<string, SelfBuffDefinition>`を直接では
なく`SubjectPerpetualStatus`と同様に`(config: SubjectConfig) => SelfBuffDebuffs`という関数として持たせる
（`SubjectSelfBuffDebuff`型）。呼び出し側（`statusOf()`・`store.tsx`の`setSubject`・
`features/buff-debuff/containers/self-buffs.tsx`）は`SubjectBuffDebuffDictionary[config.subject]?.(config)`
のように都度`config`を渡して呼び出す。
`statusOf()`（`subject-dynamic/status/calculation.ts`）内で`config.selfBuffs`を解決して
`componentStatus`へ畳み込む（`origin: "temporary-status"`で注入。実験体固有の恒久パッシブ
（`origin: "perpetual_status"`）とは区別する）。`features/subject-config/store.tsx`の`setSubject`が、
実験体選択時に実験体固有の自己バフをスタック0で自動投入する。

現時点では実データを持つ`buff-debuff.ts`は1つも存在せず（サンプル定義の作成は次のステップ）、装備アビリティ
・特性（augment）由来の自己バフ、他者バフ（`incomingBuffs`）の追加・削除UIも未着手。

### 6. ~~（既出・再掲）`statusOf()`内の`console.log`残存~~（対応済み）

バフ・デバフ実装Step 2で`statusOf()`に手を入れた際に削除した（`known-issues.md`記載のデバッグ用
`console.log`計4箇所のうちの1つ）。

`subject-dynamic/status/calculation.ts:455` — [known-issues.md](../../docs/known-issues.md)の「既知の軽微な
バグ」に既出（デバッグ用`console.log`計4箇所のうちの1つ）。このエリアに手を入れる際は併せて削除する。

### 7. ~~ダメージ計算ドメインロジックが`core/`外（`features/damage/`のView/コンテナ層）に漏れ出している~~（対応済み）

- **ダメージ軽減**: `createMitigation()` / `MitigationInfo`型 / `mitigatedDamage()`を
  `core/damage-table/mitigation.ts`へ移動。旧`mitigation-context.ts`は`MitigationContext` /
  `useMitigation()`のみに縮小。
- **回復量増加の適用**: Simple(`potency-rows/standard-damage.tsx`)・Combat
  (`combat/subtables/rows/standard-damage.tsx`)・`potency-rows/unique-expression.tsx`の3箇所に独立実装
  されていた「回復効果には`healerGiveHpHealRatio`を乗算する」ルールを`core/damage-table/heal-power.ts`の
  `healPowerOf()` / `applyHealPower()`に一本化。
- いずれも`src/test/{mitigation,heal-power}.test.ts`で自作データによる検証を追加。

### 8. ~~効果量計算の共通処理（致命打期待値・動的レシオ解決・倍率合成）も同様に`core/`外に散在~~（対応済み）

- **致命打期待値**: `core/damage-table/critical.ts`の`criticalMultiplier()` / `expectedMultiplier()`に
  一本化。**このとき単なる配置移動では済まず、Simple mode側の期待値の式が持っていたバグを発見して修正した**
  （regularDamageを二重に乗算しており、regularDamageが100のときだけ偶然正しい値になっていた。例:
  regularDamage=200・致命打確率50%で修正前450→修正後（正しい加重平均）275）。Combat mode側は元々正しい式
  だったため表示値は変化しない。ユーザーに確認のうえで修正を実施（`git log`のcommitメッセージ参照）。
- **動的レシオ値の解決**: `containers/combat/subtables/rows/use-dynamic-value-calculation.ts`
  （Reactを一切使っていない、hookを偽装した純粋関数だった）を、`calculateValue()`の続きとして
  `core/value-ratio/calculation.ts`の`resolveDynamicValue()`に統合。
- **`extractMultiplier()`**: `core/damage-table/multiplier.ts`へロジック変更なしで移動（元々重複はなかった）。
- **基本攻撃威力倍率のディスパッチ**: `use-basic-attack-ratio.ts`（同じくhookを偽装した純粋関数）を
  `core/subject-dynamic/status/basic-attack-ratio.ts`の`basicAttackRatioOf()`に統合。
- いずれも`src/test/{critical-hit,resolve-dynamic-value,basic-attack-ratio,extract-multiplier}.test.ts`で
  検証。

作業の詳細な経緯・確認内容は`git log`の該当コミット（`core/README.md item7`・`item8`で始まるメッセージ）を
参照。

## 関連ドキュメント

- [docs/known-issues.md](../../docs/known-issues.md) — 「バフ・デバフ効果全般が未実装」の項目。独立化前の
  `ercalc_resources`ルート側にのみ現存する旧`buff`ブランチ（`src/`側の新リポジトリには存在しない）の設計メモ
  についても記載。
- [docs/status-model.md](../../docs/status-model.md) — 「要素の合成順序」節。
