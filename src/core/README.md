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

> 4・5・6は、バフ・デバフ計算機能の実装に着手するタイミングで併せて見直す方針（6の`console.log`削除も含む）。

### 4. `config.perpetualOuterBuffs`は宣言のみで未接続（死んでいるフィールド）

`subject-dynamic/config/type.ts`の`SubjectConfig.perpetualOuterBuffs: PerpetualOuterBuff[]`は「実験体のパッシブ
スキル以外の効果で得られる永続バフ（特性・アルファ/オメガ討伐など）」の入力口としてコメント付きで定義されて
いるが、`statusOf()`（`subject-dynamic/status/calculation.ts`）はこのフィールドを一切参照していない。
`features/subject-config/components/load-build-modal-default-sample.ts`で空配列が置かれているのみで、値を設定
するUIも存在しない。バフ・デバフの本格実装時に、この型をそのまま使うか設計し直すかの判断が必要。

### 5. 現行`buff-debuff/type.ts`は型として未成熟

- `StatusBuffDebuff.value: Record<keyof Status, number | ValueRatio>`が`Partial`になっておらず、型上は
  「全ステータスキーへの値指定」を要求してしまっている（実質バグ。1つのステータスだけに影響するバフを
  正しく表現できない）。
- `BuffDebuff`に発動元（どの装備アビリティ/スキル/特性由来か）を表す`origin`フィールドがない。
- ステータスへの加算以外の効果（例: ダメージテーブルの特定行への直接倍率適用）を表す型がない。
- `SubjectConfig`側にこの型の値を保持するフィールドがなく、`pages/simple/buff-debuffs.tsx`もUIスタブ
  （「作成中」の表示のみ）で、実データと接続されていない。

### 6. （既出・再掲）`statusOf()`内の`console.log`残存

`subject-dynamic/status/calculation.ts:455` — [known-issues.md](../../docs/known-issues.md)の「既知の軽微な
バグ」に既出（デバッグ用`console.log`計4箇所のうちの1つ）。このエリアに手を入れる際は併せて削除する。

### 7. ダメージ計算ドメインロジックが`core/`外（`features/damage/`のView/コンテナ層）に漏れ出している

分類上は`src/CLAUDE.md`の「計算コア」節が扱うべきダメージ計算のドメイン知識でありながら、実装が
`features/damage/`側のコンポーネントにしか存在しない項目が複数ある。

- **ダメージ軽減**: `features/damage/containers/combat/mitigation-context.ts`の`createMitigation()`
  （防御力・防御貫通から軽減率を算出する）と、`mitigated-damage.tsx`の`mitigatedDamage()`（軽減後の最終
  ダメージを算出する）は、いずれも`Status` / `Decimal`のみに依存する純粋関数で、Reactへの依存が実質ない
  （`mitigated-damage.tsx`の`import * as React from "react"`は未使用のdead import）。`mitigation-context.ts`は
  さらに`MitigationContext` / `useMitigation()`というReact Context/hook（こちらは正しくfeature層にあるべき
  もの）と`createMitigation()`が同一ファイルに混在しており、「Reactに依存する橋渡し」と「純粋な計算ロジック」
  の境界がファイル単位でも曖昧になっている。
- **回復量増加の適用**: `containers/potency-rows/standard-damage.tsx:31-48`（Simple mode）は、
  `calculateValue()`で算出した素の威力（`staticBaseValue`/`dynamicBaseValue`）に対し、`props.type?.type ==
  "heal"`のとき`status.healerGiveHpHealRatio`を乗算する、という「回復効果には回復量増加ステータスを適用する」
  というドメインルールをコンポーネント内に直接実装している。同じルールが`containers/combat/subtables/rows/
  standard-damage.tsx:60-61`（Combat mode）にも**独立して重複実装**されている（`finalPotency =
  totalPotency.addPercent(healPower ?? 0)`）。Simple/Combatの行コンポーネントが別実装であること自体は
  [known-issues.md](../../docs/known-issues.md)に既出だが、ここで重複しているのは行の見た目ではなくドメイン
  ルールそのものであり、計算ロジックが`core/`に集約されていれば本来重複しないはずのもの。

- 対応候補: これらの計算本体（`createMitigation()` / `mitigatedDamage()` / 回復量増加適用ロジック）を`core/`側
  （例: `subject-dynamic/`配下に新設する軽減・ダメージ計算専用ディレクトリ、または既存の`damage-table/`付近）
  へ移動し、`features/damage/`側はReact Context/hookやpropsの橋渡しに徹する薄い層として整理する。
- 同種のパターンが他にもないか（`features/damage/`配下の`damage-table-util.ts`・
  `use-{augment,item-skills,tactical-skill,weapon-skills,basic-attack-ratio}.ts`等、および他のpotency-rows/
  potency-subrowsコンポーネント）は未調査。本項目は見つかった代表例（軽減計算・回復量増加）のみを記録する。

## 関連ドキュメント

- [docs/known-issues.md](../../docs/known-issues.md) — 「バフ・デバフ効果全般が未実装」の項目。独立化前の
  `ercalc_resources`ルート側にのみ現存する旧`buff`ブランチ（`src/`側の新リポジトリには存在しない）の設計メモ
  についても記載。
- [docs/status-model.md](../../docs/status-model.md) — 「要素の合成順序」節。
