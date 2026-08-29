# 既知の課題

この計算機の実装における、解決すべき既知の課題・技術的負債をまとめる。
ゲームロジックそのものの仕様は `status-model.md` / `damage-model.md` を参照。

## バフ・デバフ効果全般が実装途中

この計算機は、スキルやアイテム効果による一時的なステータス増減、特性による恒久的な補正などの
「バフ・デバフ効果」を計算に反映する汎用的な仕組みを持たなかったが、実装に着手した（進行中の詳細な
タスクログは[core/README.md](../src/core/README.md)を参照）。

- 具体例: サポート特性「超再生」によるシールド・回復量の増幅（`damage-model.md`にゲーム仕様としては記載しているが、
  この計算機では未実装）。
- 設計方針: `SubjectConfig`に`selfBuffs` / `incomingBuffs: BuffDebuffState[]`
  （`core/subject-dynamic/config/buff-debuff-state.ts`。旧`perpetualOuterBuffs`から改称・再設計）を追加し、
  自己バフ・他者バフを分離して管理する。`calculation.ts`の`statusOf()`が扱う「永続ステータス」の仕組み
  （実験体固有パッシブ・装備固有アビリティによる`StatusValueComponent`追加）が、恒久効果に関しては既に
  前例として存在する。`origin`区分の`perpetual_status`/`temporary-status`という命名は「ゲーム内で効果が
  消えるか」ではなく「計算機上でON/OFFを切り替えられる必要があるか」で区別すべきと判明しており
  （例: アルファ/オメガ討伐バフはゲーム内では恒久的だが計算機上はtemporary、ヒスイのステータス変換パッシブは
  ゲーム内でも計算機上でも恒久的なのでperpetual）、`calculationType`の`fix`（値の上書き）は
  `perpetual_status`経由では既に実戦投入されている（詳細は[core/README.md](../src/core/README.md)項目2・3
  参照）。
- ブランチ状況: `buff`ブランチ（`status-refactor`から派生）でのステータス計算エンジン再設計を伴う旧バフ実装は
  独立化前の`ercalc_resources`ルート側にのみ現存し（`src/`側の新リポジトリには存在しない）、既に
  低優先度・参考程度と判断済み。現在の実装は`buff`ブランチの移植ではなく、現行アーキテクチャをベースに
  新規設計している。

## Simple/Combatダメージ表示の行コンポーネントが未統合

`features/damage/containers/potency-rows/*`（Simple mode、Zustand直結）と
`features/damage/containers/combat/subtables/rows/*`（Combat mode、propsのみで完結）は、
見た目・計算内容が類似しているにも関わらず別実装のまま。

- 理由: Combat側は仮想敵側のステータス（軽減計算用）も必要かつpropsベースで完結させる設計、
  Simple側はZustandの単一storeに直結という前提が異なるため。
- 対応: 無理に完全統合はせず、計算ロジック（`calculateValue`・`extractMultiplier`等）の共有に留める
  方針で一旦決着している。統合するとしても行コンポーネント自体ではなく、計算ロジック層の共有範囲を
  広げる形が現実的と見られる。

## 既知の軽微なバグ（現時点で実害なし・未対応）

- **`tacticalSkillCooldownReduction`**（戦術スキルクールダウン減少）: `ultCooldownReduction`（究極技クールダウン減少）は
  通常のクールダウン減少（`cooldownReduction`）と合算した上で減少率を計算しているのに対し、
  `tacticalSkillCooldownReduction`は`tacticalCooldownReduction`単体でしか計算されておらず、通常CDRとの合算が
  行われていない（`src/core/subject-dynamic/status/calculation.ts`）。
  現状、戦術スキルのクールダウンを表示するUIが存在しないため実害なし。
- **`slowResist`**（移動速度減少耐性）: ステータスとしてはゲーム側で廃止されているが、計算ロジック自体は
  `calculation.ts`に残っている（デッドコード）。
- **`ValueRatio`の`criticalDamage`キー**: 型定義のみ存在し、`calculateValue`のswitch文にcaseがなく未実装。
  現状どのスキルからも参照されていないため実害なし。
- **`EquipmentBaseStatus`型に定義されているが未使用のキー**: `maxSp`, `spRegenRatio`,
  `weaponCooldownReduction`はAPIレスポンス由来で型定義はあるが、`ComponentStatus`側に対応フィールドがなく
  計算に一切使われていない（スタミナ・武器スキル固有CDRはこの計算機の対象外）。
- **デバッグ用`console.log`の残存**（2026-08-29再確認、計4箇所）: `core/subject-dynamic/status/
  calculation.ts`の`statusOf()`内、`ingame-params/subjects/sissela/perpetual-status.ts`、
  `ingame-params/subjects/hisui/t.ts`、`features/subject-config/containers/equipment-list-modal.tsx`
  （旧`components/modal/equipment-list.tsx`。2026-08-29の再編で`features/subject-config/`へ移動済み）。
  動作に影響はないが削除候補。
