# 戦術スキル バフ・デバフ実装チェックリスト

他のカテゴリ（subjects/equipment-abilities/weapon-skills/augment）と異なり、要件は5件ずつではなく
14件すべてが1回のメッセージでまとめて提示された。そのため本チェックリストは「進行中のTODOリスト」ではなく、
実装完了後の設計判断・注記をまとめた記録として機能する。

## 全般的な設計方針

戦術スキルはゲーム内でLv1/Lv2にアップグレードできるが、この計算機のUIには戦術スキルのレベルを切り替える
手段がない（ダメージ側の実装、`damage-table.ts`の`origin: "tactical1"/"tactical2"`も同様の前提）。
そのため、**効果量がLv1/Lv2で異なるデータ（`constants.ts`で配列になっているフィールド）は
`<skill>.lv1`/`<skill>.lv2`という2つの独立したバフ・デバフエントリに分割**し、レベルに依存しないデータは
単一エントリのままとした。どちらにするかは「ユーザーの説明にLv1/Lv2の言及があるか」ではなく
「`constants.ts`の実データが配列かどうか」で機械的に判定している（例: 赤嵐はユーザー説明に
Lv言及がなかったが、`range: [10,15]`が配列だったため分割した）。

`nameIntlID`（カタログ上の表示名）は、実験体スキル・武器スキル・特性と異なり、常に
`tactical-skill.<skill>.<qualifier>`という専用のローカルid（`tactical-skill.json`に新設）を使う。
既存サンプルの「プロトコル違反」がこの方式だったため踏襲した。理由: 同じ効果がLv1/Lv2で2つのカタログ
エントリとして並ぶため、実際の`CharacterState`テキスト（例:「プロトコル違反」）だけでは選択肢が区別できず、
「Lv.1」「Lv.2」を明示する必要があるため。`StatusValueComponent.intlID`（ツールチップの内訳表示用）は
引き続き実際の`CharacterState/Group/Name/<n>`を使う。

**注記（`constants.ts`が着手前にsnake_case→camelCaseへリファクタ済みだった）**: `augment/`パスと同様、
本パス開始時点で`constants.ts`は既にcamelCase（ただし`protocol_violation`・`electric_shift`・
`plasmaDash.defense_down`はsnake_caseのまま残存、という部分的な状態）にリファクタされていたが、
`damage-table.ts`・`buff-debuff.ts`（既存の「プロトコル違反」サンプル）側の参照が追従しておらず
型エラーになっていたため、あわせて修正した（機能的な変更はなし）。

## 各戦術スキル

- [x] **ブリンク**（`blink`）— Lv2のみ自己バフ、移動速度増加固定15%。`CharacterState/Group/Name/4000000`
  （「加速」）
- [x] **クエイク**（`quake`）— スロウのみ（Lv1:40%/Lv2:50%）。`TacticalSkillSlowSources`に登録
  （`CharacterState/Group/Name/4001010`、l10n上"クエイク"というテキストで実際にスロウ効果と一致）
- [x] **プロトコル違反**（`protocol_violation`）— 既存サンプル（外向きバフ、最大体力増加、発生源レベル
  依存）。`hp_increase`→`hpIncrease`のフィールド名不一致のみ修正、ロジックは変更なし
- [x] **赤嵐**（`electric_shift`）— 自己バフ、基本攻撃射程増加。データが`range: [10,15]`という配列
  だったためLv1/Lv2に分割（ユーザー説明にはLv言及なし）。`CharacterState/Group/Name/4102000`
  （「静電気」。`constants.ts`のコメント「静電気状態持続時間」と一致）
- [x] **超越**（`forceField`）— Lv2のみ自己バフ、妨害耐性増加。`{base, additionalMaxHP}`という
  ValueRatio形状のため`calculateValue`で解決。`CharacterState/Group/Name/4103010`（「超越 - 血気」）
- [x] **アーティファクト**（`totem`）・**リパルサーミサイル**（`repulsorMissile`）— バフ・デバフなし
  （ユーザー指示通り）。なお`CharacterState/Group/Name/4115000`に「リパルサーミサイル - 防御力減少」という
  テキストが存在するが、`constants.ts`の`repulsorMissile`には対応する数値データが一切なく、ユーザーからも
  そのような効果の言及がなかったため未実装（`weapon-skills/camera`の視界減少デバフと同種の「データなし」
  判断）
- [x] **無効化**（`nullification`）— 3つの自己バフに分割:
  1. `nullification-movement-speed.lv1`/`.lv2`: 移動速度増加（Lv1:20%/Lv2:30%）、
     `CharacterState/Group/Name/4105010`
  2. `nullification.debuff-cleanse-bonus`: デバフ効果解除時の追加移動速度増加（30%固定、Lv1/Lv2共通）、
     `CharacterState/Group/Name/4105000`（「デバフ効果解除 - 無効化」）。ユーザー指示通り「別バフとして
     実装」
  3. `nullification.ally-tenacity`（Lv2のみ、妨害耐性増加、`CharacterState/Group/Name/4105020`
     「妨害耐性 - 無効化」）: 「自分と周囲の味方」が対象だが、効果量が自他で同一のため
     `TacticalSkillGivenBuffDebuff`側にのみ登録する（キャスター自身が必要な場合もそちらから追加する）。
     初回実装時は要件提示漏れにより未実装だったが追加指示で対応、さらにレビューで自己バフ側との重複登録を
     指摘され1本化した
- [x] **強い絆**（`soulStealer`）— 外向き移動速度・ダメージ吸血バフ。Lv1/Lv2それぞれ1エントリ（1つの
  バフが2つの効果を持つため、`amplificationDrone`と同じ理由でまとめた）、消費エネルギーを10刻みの
  スタックプルダウンとして表現（`soulStealerEnergy()`）。Lv1は0〜70（8刻み）、Lv2は0〜90+99
  （最後の刻みは100ではなく99にクランプ、ユーザー指示通り）。「無効」を含めた10刻みのプルダウンにする
  ため、内部的には`index-1`を10倍した値をエネルギー量として扱う（`stack==0`で0を返す規約を満たすため。
  他のバフでも繰り返し使っている「無効＋シフトしたindex」パターン）。
  - **CharacterState割り当ての推測に注意**: `CharacterState/Group/Name/4107000`「強い絆 - 怒り」を
    移動速度、`4107010`「強い絆 - 守り」をダメージ吸血に割り当てたが、テキストからの直接的な対応付けは
    できず推測（怒り=攻撃的効果=移動速度、守り=生存効果=ダメージ吸血、という解釈）。誤っていれば要修正
- [x] **ストライダー - A13**（`theStrider`）— 3つに分割:
  1. `the-strider.on-use`: 使用時（敵に向かって移動時）の移動速度増加（30%固定）、
     `CharacterState/Group/Name/4114000`
  2. `the-strider-after-attack.lv1`/`.lv2`: 与ダメージ時の移動速度増加（近接/遠隔、Lv1/Lv2で異なる）、
     `weaponRangeOf`で分岐、`CharacterState/Group/Name/4114020`（「ストライダー - A13(打撃)」）
  3. Lv2のみのスロウ（近接50%/遠隔30%）は`TacticalSkillSlowSources`に登録（`4114030`。近接/遠隔の
     2値を`values`配列+`valueLabels: ["近接","遠隔"]`（新設した`buff-debuff.common.melee`/`.range`）で
     表現。`SlowSourceInfo`の`values`配列を「近接/遠隔」の軸に使うのは今回が初めて。従来は
     スキルレベル軸での使用のみだった）
- [x] **真実の刃**（`bladerOfTruth`）— 自己移動速度増加。Lv1/Lv2で分割、ヒット数（1〜3）をプルダウンで
  選択。ヒット数0は「未選択・0%」として自然に扱われる（`stack == 0 ? 0 : base + perHit[lv] * stack`、
  独自のラベルは用意せず既定の数値表示、ユーザー指示の「1~3」はプルダウンに現れる実質的な選択肢の範囲として
  解釈）。`CharacterState/Group/Name/4112000`（「真実の刃 - 投影」）
- [x] **ライトウィング**（`wingsOfLight`）— 自己バフ、移動速度（`{base:[Lv別], level:1}`という
  ValueRatio、`calculateValue`で自動的にLv別`base`を解決）+攻撃速度（20%固定、Lv1/Lv2共通）。Lv1/Lv2で
  分割。`CharacterState/Group/Name/4118000`（「ライトウィング - 移動速度、攻撃速度増加」、両効果に共通）。
  Lv2のみの「基本攻撃1的中あたりの持続時間増加」（`extend`）は持続時間関連の効果でありこの計算機の対象外
  （他カテゴリの持続時間系効果と同様）
- [x] **治癒の風**（`healingWind`）— バフ・デバフなし（回復のみ、ユーザー指示通り）
- [x] **プラズマダッシュ**（`plasmaDash`）— スロウ（`TacticalSkillSlowSources`、Lv1/Lv2共通30%固定）+
  Lv2のみの防御力低下デバフ（`plasma-dash.defense-down`、10%固定、`CharacterState/Group/Name/4116000`）。
  スロウは`4116010`

## アーキテクチャ

`TacticalSkillSlowSources`（新設、`SlowSourceInfo[]`）を`ingame-params/buff-debuff/slow-dictionary.ts`の
`SlowDictionary`に直接集約した（`augment/dictionary.ts`のような中間集約ファイルは戦術スキルには
不要——単一モジュールでカテゴリ分割もされていないため）。`sourceIntlID`は`app.tactical-skill`
（既存のカテゴリラベル）で束ねる。これで`ingame-params/README.md`が挙げていた「戦術スキルのスロウ集約は
未着手」という残課題が解消された。

これで`ingame-params/`配下のバフ・デバフ実装チェックリストパス（subjects/equipment-abilities/
weapon-skills/augment/tactical-skill）が全カテゴリ完了した。
