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

## 「与えるスキルダメージ増加」効果を計算に反映する仕組みがない

`damage-model.md`「スキルダメージ増加効果」に記載の通り、特性「増幅ドローン」・装備スキル「執行人」
（`equipment-abilities/brute_enforcer`）・「予熱 - 増幅」（`blaze_up_amplified`）・「光輝」
（`blaze_of_glory`）が持つ「与えるスキルダメージを増加する」効果は、`skillAmp`（スキル増幅）とは別種の
効果でありながら、これを計算に反映する仕組みが存在しない。`skillAmp`で代用すると数値の意味が変わって
しまうため誤り（2026-09、`blaze_of_glory`のバフ・デバフ実装時にこの代用を一度行ってしまい、レビューで
指摘を受けて撤回した）。

- 具体例: 上記4件はいずれも該当。他にも存在する可能性がある（`equipment-abilities/CHECKLIST.md`の
  該当注記参照）。
- 設計上の難所: 同じ「スキルダメージ増加」に見えて、実際には適用対象が2系統に分かれる
  （`damage-model.md`参照）。
  - 増幅ドローン型: ダメージ種別が「スキルダメージ」であれば適用（装備・戦術スキルのスキルダメージにも
    適用、ただし雪Q・エイデンQのような「基本攻撃ダメージとして扱われるスキル」には非適用）
  - 執行人・予熱-増幅型: 発生源が実験体スキル（武器スキル含む）であれば適用（雪Q・エイデンQにも適用、
    ただし装備・戦術スキルのダメージには非適用）
  - この判定軸の違いを`core/damage-table/`・`core/value-ratio/`のどこに・どう持たせるかが未検討
    （`Status`の1フィールドとしては表現できない。ダメージ算出単位ごとに「どちらの系統の増加を受けるか」を
    判定する必要がある）。
- 対応: `ComponentStatus`に`increaseSkillDamageRatio`（与えるスキルダメージ増加）フィールドを新設し
  （2026-09、`core/subject-dynamic/status/type.ts`・`calculation.ts`）、`blaze_of_glory`・
  `blaze_up_amplified`・`brute_enforcer`は通常の`perpetualStatus`/`buffDebuff`でこのフィールドに
  書き込む形に統一した（旧`givenSkillDamageIncrease`という表示専用の別経路は廃止）。`preventDamageRatio`・
  `hpHealedIncreaseRatio`と同様、**インタフェース（Status算出）のみ対応で、ダメージ計算
  （`core/damage-table/`・`core/value-ratio/`）側でこのフィールドを消費する実装はまだ行っていない**
  （上記「設計上の難所」の解決が先決）。まとめて設計してから、ダメージ計算側の実装に着手する方針
  （`equipment-abilities/CHECKLIST.md`参照）。
- `brute_enforcer`固有の注記: 本来の発動条件は「対象（敵）の残り体力」だが、シンプルモードには仮想敵の
  概念がなく判定しようがないため、単純なON/OFFの自己バフとして登録している（`brute_enforcer/
  buff-debuff.ts`参照）。対戦モードで対象の体力に応じて自動判定する専用実装（`perpetualStatus`の
  `currentHPRatio`のような「対象の体力を受け取れる仕組み」がターゲット側に必要）は将来の課題として保留。

同様に、装備アビリティ・武器スキルのバフ・デバフ実装パスを進める中で、既存の`Status`フィールドでは表現
できない効果が他にも見つかっており、いずれも`increaseSkillDamageRatio`と同じ方針
（`ComponentStatus`にインタフェースのみ新設し、ダメージ計算側の消費は未実装のまま保留）で対応している。

- `basicAttackDamageFinalCorrectionRatio`（基本攻撃ダメージに対する最終補正、％）: 装備アビリティ
  「超集中」（`ultra_focus`）の効果。実機検証の結果、基本攻撃ダメージが「攻撃力×(1+基本攻撃増幅
  `increaseBasicAttackDamageRatio`)×(致命打倍率)×(1+この補正)」の順で計算されることを確認済み。
  基本攻撃増幅とは別枠で乗算される点が異なり、`skillAmp`と`increaseSkillDamageRatio`の関係と同型。
- `increaseBasicAttackDamage`（基本攻撃追加ダメージ、固定値）: 武器スキル「過熱」（`weapon-skills/
  assault-rifle`）の効果。`increaseBasicAttackDamageRatio`（％）とは別枠の固定値加算。旧バージョンで
  装備固有ステータスとして存在していた同名フィールド（`core/equipment/status.ts`で現在コメントアウトされて
  いる未使用フィールド`increaseBasicAttackDamage`）と同種の効果のため、同じ名前を踏襲した。
- `increaseDamageRatio`（与えるダメージ増加、％）: 特性「劣勢克服」（`dismantleGoliath`）の効果。
  `increaseBasicAttackDamageRatio`（基本攻撃のみ）・`increaseSkillDamageRatio`（スキルのみ）と異なり、
  ダメージ種別を問わず適用される点が特徴。本来の発動条件（自身と対象の最大体力比較）は対戦モード専用の
  ロジックが必要なため、当面はスタック可変（0/2.5/5/7.5/10%）の選択式自己バフとして実装している
  （`augment/CHECKLIST.md`の`dismantleGoliath`注記参照）。

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
  通常のクールダウン減少（`cooldownReduction`、全発生源）と合算した上で減少率を計算する
  （`withUltCooldownReduction()`、`core/README.md`項目12参照）のに対し、
  `tacticalSkillCooldownReduction`は`tacticalCooldownReduction`単体でしか計算されておらず、通常CDRとの合算が
  行われていない（`src/core/subject-dynamic/status/calculation.ts`）。
  現状、戦術スキルのクールダウンを表示するUIがなく、このフィールドに書き込むバフ・デバフも存在しないため実害なし。
- **`slowResist`**（移動速度減少耐性）: ステータスとしてはゲーム側で廃止されているが、計算ロジック自体は
  `calculation.ts`に残っている（デッドコード）。
- **`ValueRatio`の`criticalDamage`キー**: 型定義のみ存在し、`calculateValue`のswitch文にcaseがなく未実装。
  現状どのスキルからも参照されていないため実害なし。
- **`EquipmentBaseStatus`型に定義されているが未使用のキー**: `maxSp`, `spRegenRatio`,
  `weaponCooldownReduction`はAPIレスポンス由来で型定義はあるが、`ComponentStatus`側に対応フィールドがなく
  計算に一切使われていない（スタミナ・武器スキル固有CDRはこの計算機の対象外）。
- **デバッグ用`console.log`の残存**（2026-09-04再確認、残り2箇所。`calculation.ts`の`statusOf()`内・
  `ingame-params/subjects/sissela/perpetual-status.ts`は解消済み）: `ingame-params/subjects/hisui/t.ts`、
  `features/subject-config/containers/equipment-list-modal.tsx`
  （旧`components/modal/equipment-list.tsx`。2026-08-29の再編で`features/subject-config/`へ移動済み）。
  動作に影響はないが削除候補。
