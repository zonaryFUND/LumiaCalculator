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

## 「与えるスキルダメージ増加」効果を計算に反映する仕組みがない（シンプルモードは対応済み、2026-09）

`damage-model.md`「スキルダメージ増加効果」に記載の通り、特性「増幅ドローン」・装備スキル「執行人」
（`equipment-abilities/brute_enforcer`）・「予熱 - 増幅」（`blaze_up_amplified`）・「光輝」
（`blaze_of_glory`）が持つ「与えるスキルダメージを増加する」効果は、`skillAmp`（スキル増幅）とは別種の
効果でありながら、これを計算に反映する仕組みが存在しなかった。`skillAmp`で代用すると数値の意味が変わって
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
  - 当初は両系統を`increaseSkillDamageRatio`という1フィールドに統合する想定だったが（2026-09、
    `core/subject-dynamic/status/type.ts`・`calculation.ts`）、`augment/`のバフ・デバフ実装パスで実際に
    「増幅ドローン」に着手した際、両者が本当に別々のフィールドを要する別効果であることが改めて確認された
    ため、`increaseSkillDamageRatio`（発生源基準＝執行人・予熱-増幅型。`blaze_of_glory`・
    `blaze_up_amplified`・`brute_enforcer`が使用）と`increaseSkillTypeDamageRatio`（ダメージ種別基準＝
    増幅ドローン型。特性「増幅ドローン」が使用）の2フィールドに分離した。
- **対応（シンプルモード、2026-09）**: `core/damage-table/damage-increase.ts`の`damageIncreaseRatiosOf()`
  / `applyDamageIncrease()`が、`DamageTableUnit`の`origin`（発生源）・`type`（ダメージ種別）から上記2系統の
  判定軸を含めて一括で判定する。`increaseSkillDamageRatio`・`increaseSkillTypeDamageRatio`に加え、
  `increaseDamageRatio`（劣勢克服型、後述）・`basicAttackDamageFinalCorrectionRatio`（超集中型、後述）も
  同じ関数で判定する。`features/damage/containers/potency-rows/{standard-damage,critical-available,
  unique-expression}.tsx`（Simpleモードの威力行コンポーネント全種）に配線済み。**実機検証の結果、固定
  ダメージ（`type.type == "true"`）はこれらいずれの効果も一切受け付けないことを確認済み**のため、
  `damageIncreaseRatiosOf()`は`true`を無条件で対象外にしている。
  - Combatモード（`features/damage/containers/combat/subtables/rows/*`）へは未配線（対象実験体のステータス
    軽減計算まで含めた設計が別途必要なため。「Simple/Combatダメージ表示の行コンポーネントが未統合」の項
    参照）。
  - `preventDamageRatio`・`increaseDamagedRatio`（被ダメージ側の増減）は対象の立場が必要なためCombat
    モード専用として引き続き未着手。
  - **同一フィールドへの複数発生源対応（2026-09）**: 執行人と予熱-増幅（いずれも`increaseSkillDamageRatio`
    に書き込む）、あるいは増幅ドローンとクチュリエの予熱-増幅（`increaseSkillTypeDamageRatio`と
    `increaseSkillDamageRatio`）のように、複数の発生源が同時に成立しうる。実機検証の結果、これらは
    合算してから1回だけ乗算されるのではなく、発生源ごとに独立して乗算されることを確認済み（例:
    15%増+15%増が同時発動すると1.15×1.15倍になり、合算した1.30倍にはならない）。このため
    `damageIncreaseRatiosOf()`は、`ComponentStatusValue`の合算済み`calculatedValue`ではなく、集計前の
    `components`（発生源ごとの`StatusValueComponent`。通常のステータス合成では同一フィールドの`sum`
    成分は単純加算されるが、この規則とは異なる）から発生源ごとに1件ずつ`DamageIncreaseEntry`
    （`labelIntlID`はバフ定義の`intlID`をそのまま使用）を取り出す設計にした。計算式展開（`SubRowsTable`・
    `critical-available.tsx`）でも発生源ごとに行を分けて表示し、同一の汎用ラベルを複数行で共有しない
    （React keyの一意性という実装上の要請だけでなく、UI上どの発生源による増加か判別できるようにする意図も
    兼ねる）。
- `brute_enforcer`固有の注記: 本来の発動条件は「対象（敵）の残り体力」だが、シンプルモードには仮想敵の
  概念がなく判定しようがないため、単純なON/OFFの自己バフとして登録している（`brute_enforcer/
  buff-debuff.ts`参照）。対戦モードで対象の体力に応じて自動判定する専用実装（`perpetualStatus`の
  `currentHPRatio`のような「対象の体力を受け取れる仕組み」がターゲット側に必要）は将来の課題として保留。

同様に、装備アビリティ・武器スキルのバフ・デバフ実装パスを進める中で、既存の`Status`フィールドでは表現
できない効果が他にも見つかっている。

- `basicAttackDamageFinalCorrectionRatio`（基本攻撃ダメージに対する最終補正、％）: 装備アビリティ
  「超集中」（`ultra_focus`）の効果。実機検証の結果、基本攻撃ダメージが「攻撃力×(1+基本攻撃増幅
  `increaseBasicAttackDamageRatio`)×(致命打倍率)×(1+この補正)」の順で計算されることを確認済み。
  基本攻撃増幅とは別枠で乗算される点が異なり、`skillAmp`と`increaseSkillDamageRatio`の関係と同型。
  **シンプルモード対応済み**（`damageIncreaseRatiosOf()`、上記参照。乗算は交換法則が成り立つため、
  `critical-available.tsx`では致命打倍率適用前の基礎値に対して先に適用しても、実機検証式（致命打倍率適用後
  に乗算）と数値上矛盾しない）。
- `increaseBasicAttackDamage`（基本攻撃追加ダメージ、固定値）: 武器スキル「過熱」（`weapon-skills/
  assault-rifle`）の効果。`increaseBasicAttackDamageRatio`（％）とは別枠の固定値加算。旧バージョンで
  装備固有ステータスとして存在していた同名フィールド（`core/equipment/status.ts`で現在コメントアウトされて
  いる未使用フィールド`increaseBasicAttackDamage`）と同種の効果のため、同じ名前を踏襲した。**未対応
  （2026-09時点で意図的に後回し）**: この加算値は防御力・防御熟練度による軽減を受けないという特性があり
  （実機検証済み）、単純に基礎値へ加算するとこの非軽減特性が表現できない。表示上も「100+10」のように
  軽減対象外の内訳を分離して見せたい意図があり、対応には基本攻撃ダメージの表示・計算構造そのものへの
  手当てが必要なため、他のフィールドとは別扱いで保留。
- `increaseDamageRatio`（与えるダメージ増加、％）: 特性「劣勢克服」（`dismantleGoliath`）の効果。
  `increaseBasicAttackDamageRatio`（基本攻撃のみ）・`increaseSkillDamageRatio`（スキルのみ）と異なり、
  ダメージ種別を問わず適用される点が特徴（ただし固定ダメージには非適用。上記参照）。本来の発動条件
  （自身と対象の最大体力比較）は対戦モード専用のロジックが必要なため、当面はスタック可変
  （0/2.5/5/7.5/10%）の選択式自己バフとして実装している（`augment/CHECKLIST.md`の`dismantleGoliath`
  注記参照）。**シンプルモード対応済み**（`damageIncreaseRatiosOf()`、上記参照）。
- `hpHealedIncreaseRatio`・`hpHealedDecreaseRatio`（自身が受ける回復量増加・治癒効果減少、％）:
  受け手側の効果だが、シンプルモードには対象（相手）実験体の概念がないため、本来は反映しようがないはず
  だった。しかし、アイザックTのような「対象を必要としない自己回復」（`type.target == "self"`）の場合は
  発生源＝受け手が同一実験体であることが確定するため、シンプルモードでも意味のある値になる。**対応済み
  （2026-09）**: `core/damage-table/heal-power.ts`の`healPowerRatiosOf()`が、`type.target == "self"`の
  場合のみこの2フィールドも判定に含めるよう拡張した（`target == "any" | "ally"`は受け手が発生源自身とは
  限らないため引き続き対象外）。

## localStorage復元時、存在しなくなった装備アイテムIDによるクラッシュ（対応済み、2026-09）

バランス調整パッチでゲーム内要素が削除・変更されることがあり（エターナルリターンの実績として、実験体
自体の削除は前例がないが、装備アイテム自体の削除はアーリーアクセス時代に、装備アイテムに付与された
スキルの差し替え・特性/戦術スキルの削除は正式サービス後も含めそれなりの頻度で発生している）、localStorage
に保存された古いビルド・プリセットが、削除された装備アイテムIDを保持したまま残ることがある。バフ・デバフ
機能の実装（`config.selfBuffs`/`incomingBuffs`の追加）によって、この種の非互換データが発生する確率が
上がったことを契機に調査した。

- 具体的なリスク: `EquipmentStatusDictionary[itemID].xxx`という無条件アクセスが、計算エンジン
  （`core/subject-dynamic/status/calculation.ts`・`core/subject-dynamic/config/function.ts`等）・
  UI（`components/tooltip/item/item-tooltip.tsx`・`features/subject-config/components/
  equipment-icon.view.tsx`等）・バフ・デバフ定義（`self-buff-definitions.ts`・`augment/
  chaos-buff-debuff.ts`の`celestialCollection`等）を含め10箇所以上に存在する。存在しないitemIDを
  引くと`EquipmentStatusDictionary[itemID]`が`undefined`になり、`.type`等へのアクセスでTypeErrorに
  よりクラッシュする。
- 一方、`config.selfBuffs`/`incomingBuffs`のid解決は、計算（`calculation.ts`の`selfBuffStatus`/
  `incomingBuffStatus`）・UI（`features/buff-debuff/containers/{self-buffs,incoming-buffs}.tsx`）の
  いずれも`definitions[id]`が`undefined`のときを既に安全に無視する実装になっており（存在しなくなった
  idは単に効果を及ぼさず一覧にも表示されなくなるだけ）、この種のクラッシュは起きない。ただし
  `config.selfBuffs`（`incomingBuffs`は対象外。ユーザーが自らカタログから選ぶだけで実験体・装備に連動しない
  ため、そもそも自動追加・削除という概念がない）については、「実験体固有スキル・装備アビリティの仕様が
  改変され、旧バフのidが新idに変わる、または完全に削除される」ケースで、理想的な挙動（旧idは自動的に
  削除され、新idはスタック0で自動的に追加される）になっているかを別途確認した。**対応（2026-09）**:
  新idの自動追加は元々`reconcileSelfBuffs`（`self-buff-definitions.ts`）が正しく行っていたが、
  「`origin: "skill" | "equipment-ability"`ではない＝ユーザーが自ら選択する特性・戦術スキル」という条件
  だけで残す・残さないを判別していたため、削除された特性・戦術スキルのidや、旧skill/equipment-ability由来の
  孤立したidが、選択式カタログにも存在しないにも関わらずいつまでも保持され続ける抜け穴があった（クラッシュ
  はしないが、`config.selfBuffs`に永久にゴミが残る）。現在は`selectableSelfBuffCatalogOf`にも同時に
  照合し、自動投入対象・選択式カタログのどちらにも存在しないidは削除するよう`reconcileSelfBuffs`を修正した。
- **対応**: `core/subject-dynamic/config/sanitize.ts`の`sanitizeConfig()`が、現在のコード上の
  `EquipmentStatusDictionary`と照合して存在しない装備アイテムIDを`null`（未装備）に戻す。個々の参照箇所を
  都度ガードするのではなく、`features/subject-config/store.tsx`の`_updateConfig`（`setConfig`によるプリセット
  読み込みも含め、実質すべての`set*`系アクションが通る集約点）と`persist`の`merge`（起動時のlocalStorage
  復元）の2箇所だけに差し込むことで、既存の`reconcileSelfBuffs`と同じ「境界で1回だけ正規化する」方針を
  踏襲した。`merge`では`statusOf()`を呼ぶより前（`reconcileSelfBuffs`の呼び出しより前）に適用する必要がある
  点に注意（`statusOf()`内部でも装備IDへの無条件アクセスがあるため、先にサニタイズしないと`merge`自体が
  クラッシュする）。
- **対応済み（2026-09）**: スキルレベル（`config.skillLevels`）が、パッチによる最大レベル変更後も旧仕様の
  値のまま保存されているケース（「QWERTそれぞれの最大スキルレベル」の仕様変更は実際に前例がある）。
  実験体・スキルごとの現在の最大レベルは`SubjectSkillListExpressionDictionary`（`subjects/dictionary.ts`）
  から得られるが、`core/`側がこれを直接参照するには当時まだ循環参照のリスクがあったため、装備アイテムID・
  バフIDより対応コストが高いと判断し後回しにしていた。後続の「循環参照クラッシュ」対応
  （`subject-dictionary-registry.ts`）で安全に参照できるようになったため、`sanitizeConfig()`を拡張して
  対応した。各スキルの最大値は`configurators-line.tsx`と同じ規則（`maxLevel`未指定なら既定値
  Q/W/E=5・R/T=3、`"none"`ならレベル選択欄自体が存在しないため検証しない）で判定し、
  `config.skillLevels[key]`（0始まり）が`[0, maxLevel - 1]`の範囲外なら値をクランプする。装備アイテムIDと
  異なりクラッシュはしない（範囲外の添字はそのまま計算に使われ誤った表示になるだけ）が、意図しない誤表示を
  防ぐ。

## `core/`から`ingame-params/subjects/dictionary.ts`への直接importによる循環参照クラッシュ（対応済み、2026-09）

`ingame-params/subjects/dictionary.ts`は全実験体の`index.ts`を`import.meta.glob(..., {eager: true})`で
一括読み込みしてから13個の辞書を構築する。`core/`側のファイルがこの辞書を直接importすると、実験体モジュール
側が（直接・間接問わず）そのcore側ファイルを再びimportしていた場合にESMの循環参照が発生し、モジュール
初期化順序によっては未初期化状態の実験体モジュール（`m.default`が`undefined`）を参照してクラッシュする。

- 発見の経緯: `src/test/{item,subject-skill,weapon-skill}-tooltip.test.tsx`を`toMatchSnapshot()`による
  厳密一致検証からsmoke test（クラッシュしないことのみ確認）に切り替えたところ（「実データ全量スナップショット
  テストの位置づけ」参照）、`subject-skill-tooltip.test.tsx`がファイル収集の時点で丸ごとクラッシュしている
  ことが発覚した。従来は`toMatchSnapshot()`の不一致で全件「失敗」表示になっていたため、この収集時クラッシュ
  （0件収集）がテスト内容の失敗に紛れて気づかれていなかった。
- 実際に確認できた発生源は3箇所: `core/value-ratio/extraction.ts`（`SubjectWeaponSkillOverrideDictionary`）・
  `core/subject-dynamic/config/function.ts`（`SubjectWeaponRangeOverrideDictionary`）・
  `core/subject-dynamic/status/calculation.ts`（`SubjectPerpetualStatusDictionary`・
  `SubjectSummonInfoDictionary`）。
- **対応**: `extraction.ts`は、現在唯一登録されている上書き（`blair`の`weaponSkillLevelOverride`）が素の
  `weaponSkillLevel`と同一関数であるため、辞書参照自体を削除して`weaponSkillLevel`を直接使うよう変更した
  （`weapon-skills`配下の各`buff-debuff.ts`が既に採用している、項目13のワークアラウンドと同じ考え方）。
  残る2箇所（`function.ts`・`calculation.ts`）は、参照している上書き・実験体固有データが実際に実験体ごとに
  異なる本物のロジックであり、同じ回避策が使えないため、`core/subject-dynamic/subject-dictionary-registry.ts`
  という依存を持たない中立な仲介ファイルを新設した。`subjects/dictionary.ts`が辞書の構築完了後にこの
  レジストリへ登録し、`core/`側はレジストリ経由でのみ参照する（`subjects/dictionary.ts`を一切importしない）
  ことで、`dictionary.ts → レジストリ ← core/側`という一方向の依存関係にし、循環を構造的に断った。
  呼び出し側のAPI（`weaponRangeOf`等の関数シグネチャ）は変更していない。
- 対応の結果、`src/test/*-tooltip.test.tsx`3ファイル・全2065件が緑になった（対応前は
  `subject-skill-tooltip.test.tsx`が0件収集でファイル自体が赤だった）。

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
