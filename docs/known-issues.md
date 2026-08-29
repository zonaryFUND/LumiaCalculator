# 既知の課題

この計算機の実装における、解決すべき既知の課題・技術的負債をまとめる。
ゲームロジックそのものの仕様は `status-model.md` / `damage-model.md` を参照。

## バフ・デバフ効果全般が未実装

この計算機は、スキルやアイテム効果による一時的なステータス増減、特性による恒久的な補正などの
「バフ・デバフ効果」を計算に反映する汎用的な仕組みを持たない。

- 具体例: サポート特性「超再生」によるシールド・回復量の増幅（`damage-model.md`にゲーム仕様としては記載しているが、
  この計算機では未実装）。
- 対応: 汎用的なバフ・デバフ効果の適用システムの設計・実装が必要。
- 設計の手がかり: `calculation.ts`の`statusOf()`が扱う「永続ステータス」の仕組み
  （実験体固有パッシブ・装備固有アビリティによる`StatusValueComponent`追加、`config.perpetualOuterBuffs`という
  ユーザ選択の恒久バフ入力口）が、恒久効果に関しては既に前例として存在する。また`origin`区分には
  `perpetual_status`/`temporary-status`が、`calculationType`には`fix`（値の上書き）が型として予約されているが
  現状未使用であり、これらを一時バフ・デバフ実装にそのまま転用できるか検討の余地がある
  （[ステータスモデル](./status-model.md)の「要素の合成順序」参照）。
- ブランチ状況: `buff`ブランチ（`status-refactor`から派生）でステータス計算エンジンの再設計を伴うバフ実装が
  進行中（`translate-buff.ts`追加、`value-component/`→`value/`への再構成など、対象ファイルが広範囲かつ
  wip状態）。着手前に必ずこのブランチの状態を確認すること。2026-08-29時点で`main`側は`workaround/zustand`
  ブランチの作業により、ダメージ計算まわりが`src/components/damage/**`から`src/features/damage/**`へ
  丸ごと移動・再構成済みのため、`buff`ブランチとの差分は非常に大きくなっている。参考にする場合は
  ファイル単位のマージではなく、設計の考え方だけを参照する前提で臨むこと。

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
