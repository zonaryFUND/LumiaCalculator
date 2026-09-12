# 特性 バフ・デバフ実装チェックリスト

特性は4カテゴリ（破壊系`havoc.ts`・カオス系`chaos.ts`・抵抗系`fortification.ts`・サポート系`support.ts`）に
分かれるが、UI上はカテゴリを問わず1つの選択式自己バフカタログとして扱う（id命名は`augment.<特性名>`）。
実装は**破壊系から順に**進める。

バフ・デバフ実装のソースはカテゴリごとに`<category>-buff-debuff.ts`（`havoc-buff-debuff.ts`・
`chaos-buff-debuff.ts`・`fortification-buff-debuff.ts`・`support-buff-debuff.ts`）に分割されており、
それぞれ`<Category>BuffDebuff(config, status, currentHPRatio)`（自己バフ）・`<Category>GivenBuffDebuff`
（他者に与えるバフ・デバフ、定数カタログ）をexportする。`buff-debuff.ts`はこれら4カテゴリを集約して
`AugmentBuffDebuff`・`AugmentGivenBuffDebuff`という1つの辞書にまとめるだけの役割で、個々の特性の実装は
持たない（当初は1ファイルにまとめる想定だったが、各特性の効果が想定より複雑だったため分割した）。

進め方は[subjects/CHECKLIST.md](../subjects/CHECKLIST.md)・[equipment-abilities/CHECKLIST.md]
(../equipment-abilities/CHECKLIST.md)・[weapon-skills/CHECKLIST.md](../weapon-skills/CHECKLIST.md)と同様
（ユーザーが要件を伝え実装後にレビューする、5件ずつ進行）。ただし特性はディレクトリ単位ではなく
各カテゴリファイル（`havoc.ts`等）内の宣言順（メイン特性→サブ特性(左)→サブ特性(右)）を基準に進める。
チェック済み＝要件確認・実装・レビューが完了した状態（その特性にバフ・デバフが存在しないことの確認のみで
完了する場合を含む）。

移動速度減少（スロウ）は個別実装せず、汎用デバフ（`ingame-params/buff-debuff/generic-slow.ts`）1本に
まとめ、発生源側は参照専用の`slowSources`に登録する方針（`weapon-skills/*`と同様）。ただし`augment/`には
まだ`type.ts`・`dictionary.ts`・`slowSources`集約の配線がないため、スロウを伴う特性（`diamondShard`・
`bitterRetribution`等）に着手する際に新設する。

`AugmentBuffDebuff`の既存サンプル: `steadfast`（堅固、`fortification.ts`、`Trait/Name/7110401`）が
バフ・デバフ選択式自己バフのインターフェース検証用に実装済み。

**アーキテクチャ変更（`AugmentBuffDebuff`が`currentHPRatio`を受け取れるようになった）**: `frenzy`（狂奔）の
実装過程で、効果量が自身の現在体力割合に依存する特性を正しく扱うため、`AugmentBuffDebuff`の引数を
`(config)`から`(config, currentHPRatio)`に拡張した。`SubjectPerpetualStatus`・
`EquipmentAbilityPerpetualStatus`が`statusOf(config, currentHPRatio)`の`currentHPRatio`をそのまま
受け取っている既存の前例に倣ったもので、以下の経路で素通しされる:

```
calculation.ts の statusOf(config, currentHPRatio)
  → selfBuffDefinitionsOf(config, status, currentHPRatio)
    → selectableSelfBuffCatalogOf(config, status, currentHPRatio)
      → AugmentBuffDebuff(config, status, currentHPRatio)
        → Havoc/Chaos/Fortification/SupportBuffDebuff(config, status, currentHPRatio)
```

UI表示側（`self-buffs.tsx`）は、Storeが持つ`hpRatio`（体力スライダーの選択値）を同じ経路で渡す。
`AugmentBuffDebuff`・`TacticalSkillBuffDebuff`・`SubjectSelfBuffDebuff`・`EquipmentAbilitySelfBuffDebuff`は
元々4つの独立した関数型（共通インターフェースを継承していない）であり、`AugmentBuffDebuff`の呼び出し元は
`selectable-self-buff-catalog.ts`の1箇所のみのため、この拡張は実験体固有バフ・装備アビリティバフには
一切影響しない（`TacticalSkillBuffDebuff`は元々`status`を受け取れる形だったが今回`currentHPRatio`は
渡していない。必要になった時点で同様に追加すればよい）。

## 破壊系（havoc.ts）

**注記（`havoc.ts`・`chaos.ts`・`fortification.ts`・`support.ts`はこのパス着手前にsnake_case→camelCase・
一部ネスト構造（例:`fortification.ts`の各特性が`status`サブオブジェクトを持つ形）へリファクタ済みだった。
ただし`table-value.ts`側の参照が追従しておらず型エラーになっていたため、本パス開始時にあわせて修正した**
（`Havoc.frailty_infliction`→`Havoc.frailtyInfliction`等の単純な改名に加え、`Fortification.diamondShard.
status.defense`・`Fortification.ironclad.status.preventDamageRatio`/`status.tenacity`・
`Fortification.embolden.status.defense`・`Support.amplificationDrone.status.movementSpeed`/
`status.skillDamageMultiplierRatio`のようにパスが1段深くなったものも追従）。

### メイン特性
- [x] `frailtyInfliction`（絶対武力）— 外向きデバフ（防御力減少15%、ON/OFF）。`AugmentGivenBuffDebuff`
  （新設。`TacticalSkillGivenBuffDebuff`と同じ「発生源固有の単一定数カタログを`incoming-catalog.ts`から
  直接import」パターン）に`augment.frailty-infliction`として追加。他者バフの発生源カテゴリ表示
  （`source.ts`の`incomingBuffSourceIntlID`）に`app.augment`（"特性"）を新設し、実験体スキル・武器スキル・
  戦術スキルと同様に特性由来のバフ・デバフも発生源カテゴリを表示できるようにした
- [x] `vampiricBloodline`（吸血鬼）— 自己バフ、最大8スタック。1スタックごとに適合能力値+1・生命力吸収
  （近接1.5/遠隔1、`weaponRangeOf`で分岐）、最大スタック時のみ追加で適合能力値（`base + level*config.level`）
  を得る。`adaptiveForce`の配列に「通常スタック分」「最大スタック時追加分（`stack == maxStack`以外は0）」の
  2つの`StatusValueComponent`を持たせる形で表現
- [x] `adrenaline`（アドレナリン）— 自己バフ、最大6スタック。1スタックごとに攻撃速度増加（近接/遠隔・
  レベルで効果量が異なる）、最大スタック時のみ追加で攻撃速度・移動速度を得る。**「攻撃速度上限無視」は
  未対応**: この計算機の攻撃速度上限（`calculation.ts`の`attackSpeed.max: 2.5`、固定値でバフ側からの
  上書き機構がない）をバイパスする仕組みが存在しないため、最大スタック時の攻撃速度も通常通り2.5倍で
  クランプされる。カルラの「T上限値」（同じく上限関連の特殊効果だがインタフェース自体が存在せず表示のみ）
  と同種の既知の未対応事項として扱う（新規の仕組み作りは本パスの対象外と判断）
- [x] `accelerator`（アクセルレート）— 自己バフ、攻撃速度増加（固定値120%、ON/OFF）。ダメージ部分
  （3回目基本攻撃追加ダメージ）は`table-value.ts`の`acceleratorStrategy`で実装済みのため対象外

### サブ特性（左）
- [x] `dismantleGoliath`（劣勢克服）— 本来は自身と対象の最大体力比較で連続的に変化する与ダメージ増加効果
  だが、シンプルモードには対象の最大体力を判別する仕組みがないため、新設した`increaseDamageRatio`
  （与えるダメージ増加、％。基本攻撃・スキル問わない点が既存の`increaseBasicAttackDamageRatio`・
  `increaseSkillDamageRatio`と異なる。`docs/known-issues.md`参照）に対する2.5%刻み・0〜10%
  （`CommonPercentLabels(10, 2.5)`。既存ヘルパーが非整数stepにもそのまま対応できたため新規ヘルパー不要）の
  選択式自己バフとして暫定実装。対戦モードでの本来の計算式（`havoc.ts`の`dismantleGoliath.min`/`max`/
  `multiplier`）への対応は将来の課題として保留（対象体力を扱えないシンプルモードの構造的な制約のため、
  `rio`のQ皆中バフと同種の後回し）
- [x] `frenzy`（狂奔）— 生命力吸収増加、自身の現在体力割合（80%で+5%〜40%以下で+10%の線形補間、
  `Havoc.frenzy`）に応じて変化する自己バフ。当初はシンプルモードに自身の現在体力（比率）を渡す経路がないと
  誤認し、「消耗体力割合をstackとして選択させる」暫定実装にしていたが、`SubjectPerpetualStatus`・
  `EquipmentAbilityPerpetualStatus`が`statusOf(config, currentHPRatio)`の`currentHPRatio`を既にそのまま
  受け取っている前例に倣い、`AugmentBuffDebuff`（および`selectableSelfBuffCatalogOf`・
  `selfBuffDefinitionsOf`）にも同じ`currentHPRatio`を素通しする経路を新設して解消した（下記「アーキテクチャ
  変更」参照）。最終形は`maxStack: 1`のON/OFF自己バフで、ONのときの効果量は選択中の体力スライダー
  （Storeの`hpRatio`）に応じて自動計算される（`frenzyLifeSteal()`）
- [x] `contemptForTheWeak`（弱者蔑視）— `equipment-abilities/brute_enforcer`と同型（対象の残り体力割合
  依存の発動条件をシンプルモードでは判別できないため、単純なON/OFFの自己バフとして登録）。効果は
  `increaseDamageRatio`（与えるダメージ増加）へ固定値8%
- [x] `cicatrix`（傷跡）— 外向きデバフ、`hpHealedDecreaseRatio`（受ける治癒効果減少。既存フィールド、
  例: キャシーTと同枠）最大2スタック、1スタックあたり10%。`AugmentGivenBuffDebuff`に追加

### サブ特性（右）
- [x] `bearMask`/`boarMask`/`wolfMask`/`wildDogMask`（狩猟 - 熊/イノシシ/オオカミ/ハウンド）— 4つの独立した
  選択式自己バフ（`augment.bear-mask`等）として実装（ゲーム内では1特性枠に対する4択で同時装備不可だが、
  他の特性同様この計算機は選択の排他制御を行わず、ユーザーが自ら管理する前提。`vampiricBloodline`等の
  「近接/遠隔で対象ステータスが違うだけで構造共通」の場合は`weaponRangeOf`分岐で1エントリにまとめたが、
  狩猟系は対象ステータス自体が4種とも異なる`{adaptiveForce, maxHp, attackSpeed, lifeSteal}`ため分岐でなく
  素直に4エントリとした）。

  共通する挙動（「特性選択だけでbaseステータス」「対応する野生動物・敵実験体処置でスタック蓄積、
  10スタックごとに効果量が段階的に増加」）を、「無効」・0・10・20・…・80スタックの10択
  （`HuntingMaskMaxStack = 9`、`HuntingMaskStackLabels`）としてユーザー要望通り実装。「無効」
  （index 0）はバフ欄に追加したままbaseステータスも含めて一時的に無効化する利便性オプション、
  「0スタック」（index 1）はbaseステータスのみ有効、以降1段階ごとに`stackBuff.effect`を1単位ずつ加算
  （`huntingMaskValue()`）。havoc.tsには`vampiricBloodline`・`adrenaline`のような別枠の
  「最大スタック時追加ボーナス」フィールドが存在しないため、80スタック到達時の効果は
  「base + effect×8」という自然な延長のみで、追加の隠しボーナスは実装していない（該当データがあれば
  追加対応）

## カオス系（chaos.ts）

### メイン特性
- [x] `stellarCharge`（ステラチャージ）— バフ・デバフなし
- [x] `ghostLight`（鬼火）— 外向きデバフ、`hpHealedDecreaseRatio`（受ける治癒効果減少）30%固定
- [x] `redSprite`（霹靂）— バフ・デバフなし
- [x] `syphonMaelstorm`（渦流）— 2つの自己バフとして実装:
  1. `augment.syphon-maelstorm-movement-speed`: 移動速度増加（近接10%/遠隔5%、`weaponRangeOf`分岐）
  2. `augment.syphon-maelstorm-overheal`: 回復（`Chaos.syphonMaelstorm.heal`。additionalAttack/amp/maxHP/
     lostHPの4項目`ValueRatio`）が自身の失った体力を上回った場合、その差分が一時的な最大体力として追加される
     効果をON/OFFの選択式自己バフとして近似（`syphonMaelstormOverheal()`）。

     この実装は直前の`frenzy`のアーキテクチャ変更（`AugmentBuffDebuff`への`currentHPRatio`の追加）を
     さらに活用する形で、`status`も新たに受け取れるように拡張した（`AugmentBuffDebuff(config, status,
     currentHPRatio)`）。`critical_blow`（装備アビリティ、同種の「回復による最大体力変換」効果）は
     `currentHPRatio`を受け取れなかった当時の制約により理論上の最大値（失った体力=最大体力と仮定）で
     近似していたが、こちらは実際に選択中の体力スライダー（`currentHPRatio`）から実際の失った体力を算出し、
     `calculateValue()` + `resolveDynamicValue()`で回復量（`lostHP`という動的レシオを含む）を正しく解決した
     上で差分を求めており、より正確。`calculateValue`は`core/value-ratio`の集約indexから利用しており
     （`pistol`の前例と同様、`weapon-skills/dictionary.ts`のeager globチェーンに含まれない`augment/`からは
     問題なく呼べる）、`origin: "other"`のため`extractSkillLevel`は即座に`undefined`を返すだけで安全

### サブ特性（左）
- [x] `circularSystem`（サーキュラーシステム）— バフ・デバフなし
- [x] `openWounds`（傷の悪化）— バフ・デバフなし
- [x] `stoppingPower`（徹甲弾）— 自己バフ、防御貫通（割合、`penetrationDefenseRatio`）増加。
  l10n上"徹甲弾"という同名の`Trait/Name`が2件（`7010101`/`7310401`）存在するが、`7310401`が
  `chaos.ts`サブ特性右の番号帯（overwatch:7310301、quickDraw:7310601、celestialCollection:7310701）と
  連続しているためこちらを採用（`7010101`は破壊系の番号帯で無関係）
- [x] `quickDraw`（速射）— 自己バフ、適合能力値（レベル依存）+攻撃速度増加

### サブ特性（右）
- [x] `powerCrescendo`（力の蓄積）— 自己バフ、ゲーム内時刻（13択、`Chaos.powerCrescendo.adaptiveForce`の
  配列インデックス）に応じた適合能力値増加。時刻ラベルは`intl/locales/ja/augment.json`に新設
  （`augment.game-time.0`〜`.12`）。同ファイルにあった旧設計の残骸`augment.frailty_infliction`
  （どこからも参照されていなかった）は削除
- [x] `overwatch`（オーバーウォッチ）— 自己バフ、クールダウン減少（`cooldownReduction`）。合計クールダウン
  減少がしきい値（40%）を超えると追加で適合能力値+5。しきい値判定は自己バフ自身を含まない中間状態の
  `status.cooldownReduction.calculatedValue`（ヘイスト値からの変換済み％）にこの特性自身の5%を単純加算した
  近似値で行っており、他に同時選択中のクールダウン減少系自己バフがある場合の正確なヘイスト再計算は
  行えていない（既知の近似、`overwatchThresholdMet()`参照）
- [x] `r_echarger`（R_echarger）— 2つの自己バフとして実装:
  1. `augment.r-echarger-cooldown`: 究極技クールダウン減少（`ultCooldownReduction`）15%固定
  2. `augment.r-echarger-adaptive-force`: 適合能力値増加（レベル依存）。本来はR使用後一定時間のみ有効な
     バフだが、他の一時条件付き自己バフ（`brute_enforcer`等）と同様、発動中を仮定したON/OFFとして登録
- [x] `celestialCollection`（極上のコレクション）— 装備の等級（英雄<伝説<神話）に応じた累積ボーナス。
  当初は「この計算機は装備の等級情報を持たない」と誤認し、伝説・神話の個数をユーザーの自己申告制
  （選択式スタック）にする設計で実装したが、レビューで指摘を受け訂正: 実際には装備ID
  （`config.equipment`）から`EquipmentStatusDictionary`を引いた`EquipmentStatus.itemGrade`
  （`core/equipment/status.ts`の`Tier` = `"Epic"`(英雄)/`"Legend"`(伝説)/`"Mythic"`(神話)）で正確に
  判別可能なため、`celestialCollectionCounts()`が装備構成から英雄以上/伝説以上/神話の個数をすべて自動集計する
  形に修正した。最終的に`augment.celestial-collection`という単一のON/OFF自己バフ（トレイト選択の有無のみ
  ユーザー操作、しきい値判定はすべて自動）にまとめられた。

  さらにレビューで、英雄装備のみの段階でも7項目すべて（一部0%）が表示されるのは冗長との指摘を受け、
  しきい値未達の項目は値0の`StatusValueComponent`ではなくキーごと結果オブジェクトから除外する形に変更した
  （`effectsOf()`は`buff()`の返り値のキー数だけ表示行を作るため、値を0にするだけでは行自体は消えない）。
  `stack == 0`のときも同様に空オブジェクトを返す。

  ユーザー提示の検証例（神話1・伝説3・英雄1＝計5個）で動作確認: 伝説以上の個数=4（神話1+伝説3）→
  しきい値1〜4のボーナス（adaptiveForce/defense/maxHP/movementSpeed）が有効（penetrationDefenseRatioは
  5個必要なため無効）、神話の個数=1→lifeStealのみ有効（tenacityは2個必要なため無効）、
  装備欄5/5で埋まっている→heroicボーナスも有効、という期待通りの組み合わせになることを確認

## 抵抗系（fortification.ts）— 未着手

### メイン特性
- [ ] `diamondShard`（金剛）
- [ ] `ironclad`（不壊）
- [ ] `heavyKneepads`（光の守護）
- [ ] `bitterRetribution`（応報）

### サブ特性（左）
- [ ] `embolden`（大胆）
- [ ] `painkiller`（鎮痛剤）
- [ ] `unwaveringMentality`（不屈）
- [ ] `caution`（警戒心）

### サブ特性（右）
- [x] `steadfast`（堅固）— 実装済み（サンプル）
- [ ] `dineNDash`（食いしん坊）
- [ ] `cavalcade`（特攻隊）
- [ ] `tempering`（熱処理）

## サポート系（support.ts）— 未着手

### メイン特性
- [ ] `blastCactus`（サボテン爆弾）
- [ ] `amplificationDrone`（増幅ドローン）
- [ ] `healingDrone`（治癒ドローン）
- [ ] `sentinel`（献身）

### サブ特性（左）
- [ ] `thrillOfTheHant`（狩りの戦慄）
- [ ] `thornShackles`（イバラの棘）
- [ ] `powerOfIntimidation`（威圧感）
- [ ] `healingFactor`（超再生）

### サブ特性（右）
- [ ] `logistics`（後方支援）
- [ ] `coinToss`（コイントス）
- [ ] `pennyPitcher`（割引券）
- [ ] `campingGuide`（キャンピングガイド）
