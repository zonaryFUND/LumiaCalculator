# 武器スキル バフ・デバフ実装チェックリスト

`weapon-skills/<dir>/`のディレクトリ名は武器種（`WeaponTypeID`）の英語表記を基準にしている。
`index.ts`の`code`（`tooltip.ts`の`export const code`。`Skill/Group/Name/<code>`のl10nキー）から
取得した日本語表記を併記する。

進め方は[subjects/CHECKLIST.md](../subjects/CHECKLIST.md)・[equipment-abilities/CHECKLIST.md]
(../equipment-abilities/CHECKLIST.md)と同様（ディレクトリ名＝英語アルファベット順に、ユーザーが要件を
伝え実装後にレビューする、5件ずつ進行）。チェック済み＝要件確認・実装・レビューが完了した状態（その
武器種にバフ・デバフが存在しないことの確認のみで完了する場合を含む）。

`WeaponSkillModule`（`weapon-skills/type.ts`）は1武器種につき1モジュールで一意なため、装備アビリティの
ような複数アイテムでの`code`共有・`importedValues`による値注入は発生しない（`SubjectModules.buffDebuff`と
同様、`config`/`status`のみを受け取る）。移動速度減少（スロウ）は個別実装せず、汎用デバフ
（`ingame-params/buff-debuff/generic-slow.ts`）1本にまとめ、発生源側は参照専用の`slowSources`にのみ
登録する（[ingame-params/README.md](../README.md)参照。`slowSources`は本パスで`WeaponSkillModule`に
新設し、`WeaponSkillSlowSourcesDictionary`（`dictionary.ts`）・`slow-dictionary.ts`への集約も追加した）。

**注記（`CharacterState/Group/Name`の番号は武器スキルの`code`と対応しない）**: 実験体・装備アビリティでは
`CharacterState/Group/Name/<code>`（またはその近傍）がおおむねそのスキル自身の効果名になっていたが、武器
スキルではこの対応関係が成立しない（内部的に別の番号体系が割り当てられている）。例えば`CharacterState/
Group/Name/3007000`は「強弩 - 移動速度減少」（`crossbow`、`code:3008000`）であり、`bow`（`code:3007000`）
とは無関係。実際に`bow`の移動速度減少は`CharacterState/Group/Name/3018000`（＝`Skill/Group/Name`側で
`矢の雨`と完全一致するテキスト。ただし`3018000`は`dualsword`の`code`と数値上一致するだけで無関係）で見つかった。
**該当する`CharacterState/Group/Name`は、必ず`Skill/Group/Name/<code>`の文言と完全一致するものを探して
特定すること。番号の近さで類推しない**（`assault-rifle`の`3010100`＝「過熱」もこの方法で特定した。
`3010000`は同じ数値レンジ内にある別テキスト「攻撃速度制限無視」で紛らわしい）。

**注記（`weapon-skills/*/buff-debuff.ts`から`core/value-ratio/extraction.ts`の`extractSkillLevel`を
importすると循環参照でクラッシュする）**: `weapon-skills/dictionary.ts`は`buffDebuff`を含む全武器スキルを
eager globしており、そこから`extractSkillLevel`経由で`subjects/dictionary.ts`（全実験体をeager glob）→
`core/subject-dynamic/status/calculation.ts`→`self-buff-definitions.ts`→`weapon-skills/dictionary.ts`と
循環参照が閉じ、テストで実際に「extractSkillLevel is not a function」のクラッシュを確認した
（`assault-rifle`実装時に発見）。武器スキルレベルが必要な場合は`core/subject-dynamic/status/
weapon-skill-level.ts`の`weaponSkillLevel(config.weaponMastery)`を直接使うこと（現在登録されている唯一の
実験体別上書き`blair`の`weaponSkillLevelOverride`が素の`weaponSkillLevel`と同一関数のため、現状は挙動が
完全に一致する。将来、武器スキルレベルの上書きを持つ実験体が追加された場合は要再検討。詳細は
`assault-rifle/buff-debuff.ts`のコメント参照）。

**注記（`camera`・視界減少デバフは効果量不明のため未実装）**: `Skill/Group/Desc/3023000`に「自分を見ていた
敵は追加スキルダメージを受け、{3}秒間視界が減少します」とあり、`constants.json`の`vision`（=2）は継続時間
のみ（`3`のプレースホルダに対応）。視界減少そのものの効果量（％や距離）を示すプレースホルダ・定数が
存在せず特定できなかったため、デバフとしては実装せず（ダメージ部分の`damageTable`は実装済み）。

**注記（`hammer`は着手前から`buff-debuff.ts`が存在。ただし`stackLabels`にバグがあったため修正）**:
`hammer`ディレクトリには既に`givenBuffDebuff`（防御力減少、Dスキルレベル1〜3で10/15/20%）が実装済みだったが、
`maxStack: 3`に対し`stackLabels`が3要素（`skill-level.1`〜`.3`のみ、`buff-debuff.common.none`が欠落）
しかなく、`darko`等で確立した「`maxStack + 1`個、先頭は`buff-debuff.common.none`」という規約
（`CommonSkillLevelLabelsMax5`参照）に違反していた。あわせて`buff`内の効果量参照も`effect[stack]`
（stack=0で`effect[0]`という非ゼロ値を返してしまう）になっており、本来の「未選択（stack=0）は効果0」
という挙動になっていなかった。`CommonSkillLevelLabelsMax5.slice(0, 4)`と`stack == 0 ? 0 : effect[stack - 1]`
に修正し、`darko`の`givenBuffDebuff`と同じ形に揃えた。

**注記（`onehandsword`・`highanglefire`は同名の`CharacterState`が複数存在し区別不能）**: `highanglefire`の
1撃目・2撃目のスロウは、l10n上どちらも"煙幕"という同名の`CharacterState`（`3005000`/`3005010`）が2件
存在するだけでテキストによる区別ができないため、宣言順（1撃目→2撃目）で対応させた。同様に
`onehandsword`の短剣スロウも"短剣"という同名の`CharacterState`が2件（`3015100`/`3015200`）存在し、
区別ができないため前者（`3015100`）を使用した。

**注記（`nunchaku`のチャージ中自己スロウはl10nに専用表記なし）**: 自己が受けるスロウ（発生源自身への
効果）のため、`buffDebuff`内で直接`moveSpeed`に適用し、他者向けスロウの汎用デバフ・`slowSources`には
登録しない（実験体固有スキルの自己スロウ全般と同じ扱い。例: `piolo`のQ1）。l10nに専用の`CharacterState`
表記が見当たらないため、`weapon-skills.json`に独自定義した名前（`weapon-skill.nunchaku.charge-self-slow`）
を使う。

**注記（`pistol`は着手前から`buff-debuff.ts`が既に正しく実装済み）**: 移動速度増加（`calculateValue`で
`ValueRatio`（`base`配列＋スキル増幅の`amp`）を評価、ステータス依存）・攻撃速度増加の2つの自己バフが既に
実装されていた。`calculateValue`（`core/value-ratio`）は内部で`extractSkillLevel`を使うが、
`assault-rifle`で問題になった「`weapon-skills/*/buff-debuff.ts`から直接`core/value-ratio/extraction.ts`の
`extractSkillLevel`をimportすると循環参照でクラッシュする」問題は、`core/value-ratio`（集約`index.ts`）
経由の`calculateValue`では発生しないことを確認済み（`pistol`の既存実装がクラッシュせず動作している。
テストでも確認済み）。スキルレベル配列の参照が必要な場合、`weaponSkillLevel`直接呼び出し（`assault-rifle`・
`onehandsword`）だけでなく、`calculateValue({base: [...]}, status, config, "D")`という形も選択肢になる
（後者は`SubjectWeaponSkillOverrideDictionary`の上書きも正しく考慮される。ステータス依存の値も扱える場合は
こちらがより汎用的）。

**注記（`sniperrifle`の視界関連の値はStatus対象外）**: `constants.json`の`vision`系フィールドは、狙撃モード中
の自身の視界範囲や命中時の対象視界獲得（一時的な視界共有）を表すゲームプレイ上の効果であり、`ComponentStatus`
が扱う継続的なステータス増減（バフ・デバフ）ではないため対象外。スロウ（`cripping.slow`、阻止射撃命中時、
80%/0.5秒）のみ`slowSources`として実装。l10n上"阻止射撃"という同名の`CharacterState`が2件（`3011010`/
`3011020`）存在し区別ができないため前者を使用した。

**注記（`vfarm`・2つの発動条件が同一効果量の自己バフに集約）**: `Skill/Group/Desc/3025000`によると、
VFゲージ50以上での発動時とVF暴走状態中の発動時の2条件で移動速度増加（25%、0.85秒）が発生するが、
両条件とも効果量が完全に同一なため、区別せず1つの自己バフとして実装した（ゲージ50未満のチャージ専用発動・
オーバーロード状態の発動にはこの移動速度増加が伴わない）。l10n上"VF安定化 - 移動速度増加"という同名の
`CharacterState`が2件（`3021000`/`3021010`、条件ごとに1件ずつと見られる）存在するが区別ができないため
前者を使用した。

- [x] arcana（VF媒介）
- [x] assault-rifle（過熱）
- [x] axe（血の螺旋）
- [x] bat（フルスイング）
- [x] bow（矢の雨）
- [x] camera（フラッシュ）
- [x] crossbow（強弩）
- [x] directfire（鉄菱投擲）
- [x] dualsword（双剣乱舞）
- [x] glove（アッパーカット）
- [x] guitar（Love&...）
- [x] hammer（鎧つぶし）
- [x] highanglefire（煙幕）
- [x] nunchaku（猛龍過江）
- [x] onehandsword（マントと短剣）
- [x] pistol（ムービングリロード）
- [x] rapier（閃擊）
- [x] sniperrifle（狙撃）
- [x] spear（影突き）
- [x] tonfa（高速回転）
- [x] twohandsword（受け流し）
- [x] vfarm（VF安定化）
- [x] whip（風裂き）
