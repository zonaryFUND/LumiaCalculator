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
"augment"`の判別タグ）と`SelfBuffDefinition`（`nameIntlID`・`maxStack: number`（スタックは常に0以上の
連続した整数値を取るため、選択可能な値の配列ではなく最大値のみ持たせる）・
`buff: (stack) => Partial<Record<keyof ComponentStatus | "adaptiveForce", StatusValueComponent[]>>`
（`StatusValueComponent`は配列。`subjectPerpetulStatus`等と合成する`calculation.ts`の畳み込みが配列を
期待しており、単体オブジェクトを返す設計にした結果`(components ?? []) is not iterable`の実行時エラーで
発覚・修正した）を新設した。自己バフの削除可否は`origin === "augment"`から導出する設計のため、独立した
`removable`フィールドは持たない。

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

### 9. 防御力ステータスへのバフ・デバフ適用順序が、現状の合成エンジンでは表現できない

防御力減少デバフの試験実装中、ユーザーから2024/05/23公開のパッチ1.22（防御力算出方法の変更。現在まで採用）
の資料提供があった。防御力は「実験体自身・装備による固定値をすべて単純加算（＝素の防御力）→ バフ・デバフの
割合増減をすべて乗算 → バフ・デバフの固定値増減を（乗算の**あとに**）加算」という順序で算出される（詳細は
[status-model.md](../../docs/status-model.md)の`defense`項目・出展リンク参照）。

これは[status-model.md](../../docs/status-model.md)「要素の合成順序」節の一般規則（単純加算は発生源
（実験体自身/装備/バフ）を問わずすべて合算されたあとに乗算が適用される。ヒスイの例で確認済み）と矛盾する。
防御力の場合、バフ・デバフ由来の**固定値**増減だけが例外的に乗算の後に適用され、実験体自身・装備による
固定値は引き続き乗算の前に合算される。

`calculateStatusValue`（汎用ロジック）は、sum成分を発生源によらず一括で合算してからmul成分を適用する設計
であり、この「一部のsum成分だけ乗算の後」という順序をそのままでは表現できない。**対応済み**:
`calculateMovementSpeedValue`・`calculateCooldownValue`と同様、`defense`専用の合成関数
`calculateDefenseValue`（`combine-components.ts`）を新設し、sum成分を発生源（`subject-status`/
`equipment` = 実験体自身・装備による固定値、それ以外 = バフ・デバフ由来の要素C）で分離したうえで、
バフ・デバフ由来の分だけを乗算結果に対して加算する形にした。ステータス計算エンジンの汎用合成順序自体
（`defense`以外のステータスに影響する部分）は変更していない。実装例:
`equipment-abilities/fáfnir's_scales`（防御力の固定値スタックバフ）。

### 10. 自己バフの効果量がStatusを参照する場合、バフ同士の依存関係が解決されない（精度を落として実装済み）

拳銃武器スキルのサンプル実装（移動速度上昇量が`スキル増幅の1%`を含む）を通じて、自己バフの効果量が
実験体自身の`Status`（例: スキル増幅の値）を参照する必要があるケースが判明した。自己バフの解決自体が
`statusOf()`の内部（`Status`そのものを構築している途中）で行われるため、完成した`Status`を渡すと
循環参照になる。この対応として`a1b3f1a2`で「自己バフを一切含まない中間状態のStatus」
（`subjectPerpetulStatus`・`equipmentPerpetualStatus`・`incomingBuffStatus`のみを畳み込んだもの）を
自己バフ解決の入力として渡す実装を行った。

**この実装には精度上の限界がある**: 自己バフAの効果がステータスXを変化させ、自己バフBの効果量がステータスX
を参照する場合、現状の実装ではBの計算に使われる中間StatusにはAの効果が一切反映されない（Aを含む・含まない
に関わらず全自己バフが同じ「自己バフゼロ状態」のStatusを見る）。今のところ実装されているバフはこの
依存関係を持たないため実害はないが、依存するバフの組み合わせが今後実装されると不正確な値になる。

**将来の解決の方向性（ユーザー提案）**: Statusの最終計算を、バフ配列に対する`reduce`として行う設計に変更する。
バフを1つずつ順に適用し、その都度「新たに追加されたStatusValueComponentが影響するステータス要素だけ」を
再計算していけば、後段のバフは先行するバフの効果を正しく参照できる。バフ配列の要素数はたかだか数個のはずで、
かつ差分（新規追加分）だけを再計算すればよいため、計算量の増加は限定的と見込まれる。

**未解決の課題**: バフの適用順序（＝ステータス要素間の処理優先度）をどう決定するか。現在確認されている
依存関係（例: スキル増幅→移動速度）は一方向のみで、逆方向（移動速度→スキル増幅のような）の依存は
記憶にある限り存在しないとのことで、循環しない一貫した優先順位を設定できる可能性が高いとのこと。
ただし、実際のゲーム内実装がそもそも「使用/獲得した瞬間のStatusを参照した値をバフ効果として固定する」
（＝動的な参照ではなくスナップショット）という方式である可能性もあり、この場合は今回のreduce方式による
「常に最新のStatusを参照する」設計自体が実際のゲーム挙動と異なる可能性がある点も含め、要検証。

現時点では対応不要・精度を落とした現行実装のままでよいとされている。実装するバフが増え、ステータス間の
依存関係が実際に問題になった時点で着手する想定。

### 11. `weaponRangeOf`の近接/遠隔判定に複数の誤り・例外未対応があった（対応済み）

装備アビリティ`gap`（間隔。距離依存の被ダメージ減少）のレビュー中、`weaponRangeOf`
（`subject-dynamic/config/function.ts`）の近接/遠隔判定に以下の問題が見つかった:

- 修正前は`if (config.subject == 24) return "range"`という特別扱いがあったが、`24`はアレックス
  （近接・遠隔両方の武器を装備できる唯一の実験体、常に「装備中の武器種」で判定すべき）ではなく
  **アデラ**のコードだった。結果的にアデラ（常に遠隔実験体として扱うべき特別枠）に対しては
  たまたま正しい値を返していたが、コメントも実装意図も伴わない偶然の一致で、本来対応が必要な
  ティア（アデラと同じく近接武器のみ装備するが常に遠隔実験体）には何の対応もなかった
- 武器未装備時のデフォルトが常に`"melee"`（近接）だったが、これはアレックス以外の実験体には誤り。
  ほとんどの実験体は装備可能な武器種が近接/遠隔いずれか一方のみに統一されているため、未装備時も
  その実験体本来の武器種区分を使うべき（`WeaponMasteryStatus[config.subject]`から装備可能な
  武器種を引いて判定するよう修正）。アレックスのみ近接・遠隔両方装備できるため、未装備時のデフォルト
  （近接）は例外として個別に上書きする必要がある
- イレム（イレム/ネコ）・シルヴィア（人間/バイク）のような、能動的に近接/遠隔モードを切り替える
  変身型実験体が一切考慮されていなかった。現在の武器種は変身しても変わらないため、モードに応じて
  近接/遠隔が変わるべきところ、常に固定の武器種で判定されていた（ただし武器未装備の場合は、
  ゲーム内検証の結果、現在のモードによらず近接扱いになることも確認済み）

**対応**: `weaponRangeOf`という汎用関数に実験体固有の判定ロジック（イレム・シルヴィアの自己バフ参照など）を
直接書くのは依存関係として不適切なため、`SubjectModules.weaponRangeOverride`
（`ingame-params/subjects/type.ts`）という実験体固有のオーバーライドの仕組みを新設し、
`SubjectWeaponRangeOverrideDictionary`（`subjects/dictionary.ts`。既存の`weaponSkillLevelOverride`と
同じ集約パターン）経由で`weaponRangeOf`側から間接的に参照する形にした。`calculation.ts`が既に
`SubjectPerpetualStatusDictionary`を同様の形で参照している前例に倣っており、`core/`から
`ingame-params/subjects/dictionary.ts`への依存自体はこのコードベースで確立済みのパターン。

- アデラ・ティア: `weaponRangeOverride: () => "range"`で常に固定
- アレックス: 未装備時のみ`"melee"`を返し、装備中は`undefined`を返して共通ロジック（現在の武器種）に委ねる
- イレム・シルヴィア: `buff-debuff.ts`に定義（変身モードの自己バフと同じファイルに置くのが自然なため）。
  未装備なら`"melee"`、装備中はモードの自己バフの現在のスタックで判定する。イレムは当初、変身状態と
  「地域に慣れてのステータス補正が発動しているか」を単一の3択自己バフ（0=なし/1=イレム/2=ネコ）で
  兼用していたため、「なし」状態では変身状態を判別できないという問題があった（後日ユーザビリティ上の
  理由もあり、状態識別用の効果を持たない2択バフ`subject.irem.mode`（1=イレム/2=ネコ、
  `excludeNoneOption`で「なし」を選択肢から除外）と、その状態を参照してON/OFFの効果内容を決める
  bool自己バフ`subject.irem.t-mode`とに分割済み。`irem/buff-debuff.ts`参照）
- デビー＆マーリン（変身型だが両形態とも武器種が両手剣＝近接で共通ルールのまま正しい）・ヴァーニャ
  （事実上近接実験体と見なされているが内部処理・武器種＝アルカナは遠隔のまま）はoverrideを持たず、
  共通ルールのまま変更していない

### 12. バフ・デバフ由来の通常クールダウン減少が、究極技クールダウン減少に反映されていなかった（対応済み）

装備アビリティ「魔力の種」（`mana_seed`。最大スタック時にクールダウン減少+20を得る自己バフ）を実装した
ところ、ユーザーからスタック最大時に「クールダウン減少は正しく20（16%）になる一方、究極技クールダウン
減少が-20になる」という報告があった。

原因は`ultCooldownReductionComponents`（`calculation.ts`）の構成方法にあった。以前は
`baseComponentStatus`構築時点で、装備由来の通常クールダウン減少（`sumOfEquipmentStatus
("cooldownReduction")`）を個別に複製し、装備由来の究極技専用クールダウン減少と合算したものを固定で
使っていた。この複製は装備ステータスのみを対象としており、バフ・デバフ由来の通常クールダウン減少
（`origin: "temporary-status"`の`cooldownReduction`コンポーネント。「魔力の種」やこれと同時に実装した
「リピートアクション」`iteration`が該当）は一切反映されない設計だった。

表示側（`03_skill.tsx`）は「究極技クールダウン減少の`rawHasteValue`から通常クールダウン減少の
`rawHasteValue`を引いた差分」を究極技専用の増分として表示する実装になっているため、バフ由来の通常CDRが
究極技側に反映されないと、この差分が負の値（今回の例では装備由来の究極技専用CDRが0のため、
0 - 20 = -20）になっていた。実際の計算値（`ultCooldownReduction.calculatedValue`、実際のRクールダウン
計算に使われる値）も同様に、バフ由来の通常CDRを欠いたまま算出されており、表示だけでなく機能上の不具合
だった。

**対応**: 装備由来の通常CDRの複製をやめ、代わりに「その時点で確定している通常クールダウン減少の
構成要素（全発生源）をそのまま複製し、装備由来の究極技専用の追加分だけを別途加える」
`withUltCooldownReduction()`ヘルパーを新設した。通常クールダウン減少は自己バフ解決前後
（`componentStatusWithoutSelfBuffs`・`componentStatus`）の2箇所で内容が変わりうるため、
`ultCooldownReduction`の算出（`statusForSelfBuffs`・`statusWithoutConversion`・`finalStatus`の3箇所）は
いずれもこのヘルパー経由で都度組み立て直す形にした。

**関連する既知の課題**: `tacticalSkillCooldownReduction`（戦術スキルクールダウン減少）も本来は通常CDRとの
合算が必要（`docs/known-issues.md`「既知の軽微なバグ」参照）だが、今回は対象外。現状これを表示するUIが
なく、かつこのフィールドに書き込むバフ・デバフも現時点で存在しないため実害はない。

## 関連ドキュメント

- [docs/known-issues.md](../../docs/known-issues.md) — 「バフ・デバフ効果全般が未実装」の項目。独立化前の
  `ercalc_resources`ルート側にのみ現存する旧`buff`ブランチ（`src/`側の新リポジトリには存在しない）の設計メモ
  についても記載。
- [docs/status-model.md](../../docs/status-model.md) — 「要素の合成順序」節。
