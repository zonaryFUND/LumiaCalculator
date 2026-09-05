# 装備アビリティ バフ・デバフ実装チェックリスト

`equipment-abilities/<dir>/`のディレクトリ名は英語表記（意訳されており、日本語・原語の韓国語とは
かなり異なる場合がある）を基準にしているため、「このディレクトリはどのアビリティか」の対応表を兼ねる。
`index.ts`の`code`（`Item/Skills/<code>/Name`のl10nキー）から取得した日本語表記を併記する。
同一ディレクトリが複数の`code`を持つ場合（装備ごとの差分実装、レアリティ違いなど）、日本語表記は
全コードで一致することを確認済み。

進め方は[subjects/CHECKLIST.md](../subjects/CHECKLIST.md)と同様（ディレクトリ名＝英語アルファベット順に、
ユーザーが要件を伝え実装後にレビューする）。チェック済み＝要件確認・実装・レビューが完了した状態
（そのアビリティにバフ・デバフが存在しないことの確認のみで完了する場合を含む）。

**注記（同名・同系統アビリティ）**: ディレクトリ名からは関連が読み取れないが、日本語表記が同一または
同系統（`- `以下が武器/防具ごとのバリエーション）のグループがある。パッチノート反映時に日本語表記だけを
手掛かりにすると誤ったディレクトリを編集しかねないので注意。

- **`circulation`と`vigor`は表記としては別物（本チェックリスト冒頭の抽出ミスを訂正）**: 当初どちらも
  「情熱」で完全同一の表記と記載していたが誤り。`circulation`の実アイテム（203506・203413）のskillCodeは
  `6017006`で、その`Item/Skills/6017006/Name`は「情熱 - 循環」。しかし`6017006`にはBody/Descの
  ローカライズテキストが存在せず、`vigor`と同じ`6017005`側にのみ存在する（l10nに古い仕様が混在している
  ためと見られる）。本チェックリストは`index.ts`の`code`から日本語表記を抽出しているが、`circulation`の
  `code`はこのBody/Desc解決用の`6017005`だったため、名前も`6017005`（＝`vigor`と同じ「情熱」）を拾って
  しまっていた。実際のバフ名（ゲーム内でバフアイコンにカーソルを合わせたときの表示は「循環」、アイテムの
  Name表記は「情熱 - 循環」）とは異なる。`skill.tsx`の`sanitizedCode`（`6017006`→`6017005`）は
  Body/Desc表示のためのものであり、`damageTable`・`buffDebuff`の解決（`ability.skillCode`を生のまま
  使う）には適用されないため、`circulation/index.ts`の`code`は`[6017005, 6017006]`の両方を指定している
  （詳細は`circulation/index.ts`のコメント参照。これにより、これまで実アイテム装備時に一切表示されて
  いなかった`damageTable`の追加ダメージ表示も同時に修正された）。バフの表示名は`item-skills.json`に
  「情熱 - 循環」として自力で定義した
- **「迅速」系統**: `streamlined`（迅速）・`charge_carrier`（迅速 - プラズマ）・
  `rudra_embodied`（迅速 - ルドラの短剣）・`zephyr`（迅速 - そよ風）
- **「突風」系統**: `whirlwind`（突風）・`rally`（突風 - 結集）・`gust_of_wind`（突風 - 寒気）
- **「セカンドウインド」系統**: `bloodpact`（セカンドウインド - 血の契約）・
  `colossal`（セカンドウインド - 巨人）

**注記（`_vf`サフィックス）**: `biotic_infusion`/`biotic_infusion_vf`、`flame_barrier`/`flame_barrier_vf`、
`swift_strides`/`swift_strides_vf`は、いずれも通常武器版とVF（武器進化）版のペアであり、日本語表記が
同一なのは想定通り（ディレクトリ名自体が対応関係を示しているため上記の「同名・同系統」注記とは別枠）。

**注記（awakening）**: 装備ごとに得られるステータスが異なる（`params-json/fabricated/armor-skill.json`の
`values`経由で注入）。従来`as`/`ms`/`penetration`という`Status`のkeyと一致しないキー名だったため、
`attackSpeed`/`moveSpeed`/`penetrationDefenseRatio`に統一した。あわせて204511（防御貫通版）の
`values.penetration`が`0.12`という誤った値になっていたバグを修正（実際は10%。ゲーム内表記
`Item/Skills/6048011/Body`はこの値をプレースホルダ経由で表示しておらず、誤りに気づけない状態だった。
実機で確認した正しい値の10に修正）。

**注記（体力割合で自動的にオン/オフする効果）**: ユーザーが着脱を選ぶ自己バフ（`buffDebuff`、
`SubjectConfig.selfBuffs`からON/OFFを選択する形）ではなく、現在体力割合に応じて自動的に有効/無効が
切り替わる効果は`perpetualStatus`（`(config, currentHPRatio) => ...`、実験体側の
`subjects/sissela/perpetual-status.ts`と同じ仕組み）で実装する。`buffDebuff`は使わない。UI上の可視性は
「自己バフ（自動発動）」セクション（`features/buff-debuff/containers/auto-self-buffs.tsx`。
`Status`上の`origin: "perpetual_status"`な部分要素を`intlID`ごとに集約して表示する読み取り専用の一覧）で
確保する。

**注記（「与えるスキルダメージ増加」＝新設`increaseSkillDamageRatio`）**: `blaze_of_glory`・
`blaze_up_amplified`・`brute_enforcer`が持つ「与えるスキルダメージ増加」（`docs/damage-model.md`
「スキルダメージ増加効果」参照）は、`skillAmp`（スキル増幅。別のステータス）では代用できない。
`ComponentStatus`に`increaseSkillDamageRatio`フィールドを新設し（`hpHealedIncreaseRatio`と同様、
`preventDamageRatio`に倣ってインタフェースのみ用意）、3件とも通常の`perpetualStatus`/`buffDebuff`で
これに書き込む形にしている。**ただしダメージ計算（`core/damage-table/`・`core/value-ratio/`）側でこの
フィールドを消費する実装はまだ行っていない**（増幅ドローン型「ダメージ種別で判定」と執行人型
「発生源スキルの種類で判定」という2種の適用条件の区別が必要なため、別途まとめて設計する。
`docs/known-issues.md`「『与えるスキルダメージ増加』効果を計算に反映する仕組みがない」参照）。

- `blaze_of_glory`（光輝）: `perpetualStatus`（現在体力割合で自動判定）。ツールチップの体力閾値表記漏れ
  （`constants.json`の`hp_threshold`欠落）は修正済み
- `blaze_up_amplified`（予熱 - 増幅）: `buffDebuff`で1スタックごとに加算。最大スタック時の追加効果
  （ダメージ吸血または移動速度、装備により異なる）も同じ`buffDebuff`で実装済み
- `brute_enforcer`（執行人）: 本来の発動条件「対象の残り体力が閾値(40%)以下」は対戦モードでの対象体力
  連動が必要だが未実装。シンプルモードには仮想敵の概念がなく判定しようがないため、単純なON/OFFの
  自己バフとして`buffDebuff`に登録し、「発動していたらどうなるか」を確認できるようにした
  （`brute_enforcer/buff-debuff.ts`のコメント参照。対戦モード対応は将来の課題として保留）

**注記（`blaze_up`系統）**: `blaze_up`（予熱・攻撃速度スタック）と`blaze_up_enhanced`（予熱 - 強化・
攻撃力スタック）は、ゲーム内表示・`CharacterState`グループIDがともに`6052000`「予熱」で共通の
武器種違い実装（`awakening`の速度/防御貫通版と同型）のため、`buffDebuff`のローカルidも
`item-skill.blaze-up`に統一している。`blaze_up_endurance`（予熱 - 忍耐）は既存実装がそのまま要件と
一致していたため変更なし。

**注記（`bloodpact`・新規Status項目`hpHealedIncreaseRatio`）**: 「受ける回復量増加」（ゲーム内表記
`StatType/HpHealedIncreaseRatio`）は既存の`ComponentStatus`にフィールドがなかったため新設した
（`hpHealedDecreaseRatio`「受ける治癒効果減少」の対になる項目。`core/subject-dynamic/status/type.ts`・
`calculation.ts`参照）。`preventDamageRatio`・`hpHealedDecreaseRatio`と同様、バフ・デバフ由来の
Status算出のみ対応し、対戦モードの回復量計算（`core/damage-table/heal-power.ts`）への反映は未実装。
`hpHealedDecreaseRatio`との併存時の関係（乗算されるか、どちらか一方が優先されるか等）も未検証。

**注記（`charge_carrier`はレベル比例値を持つ初のバフ・デバフ）**: 移動速度増加が固定値ではなくレベル
比例値のみ（`Constants.movement_speed.level`）のため、他のバフ・デバフでは前例のなかった
`createComponentValue`（装備由来のレベル比例値と同じ規約、`oneBased: false`）を使って`level-dependent`型の
`StatusValueComponent`を構築し、最終的な`value`だけをstackで0/1切り替えする実装にした
（`charge_carrier/buff-debuff.ts`参照）。

**注記（`combat_instinct`）**: アイテムにより効果が異なる（201525は攻撃速度のみ、201701は適合型能力値
（adaptiveForce）+攻撃速度）。`importedValues`の内容で分岐する単一の`buffDebuff`として実装（`awakening`と
同型）。要件で挙げられた「705601」は`armor-skill.json`を確認したところ`colossal`（`6016003`）のアイテムで、
`combat_instinct`（攻撃速度のみ版、`6055001`）の実際のアイテムは`201525`だったため、そちらを使用した。

**注記（`convergence`・装備アビリティ初の`slowSources`宣言＋辞書集約の実装）**: 移動速度減少効果は
`givenBuffDebuff`に個別登録せず、汎用デバフ（`generic-slow.ts`）にまとめ、`slowSources`は「辞書」表示
専用の参照データとする方針（`subjects/sissela`等で確立済み）だが、`EquipmentAbilityModule`には
`slowSources`フィールド自体が存在しなかった。追加し（`equipment-abilities/type.ts`）、
`EquipmentAbilitySlowSourcesDictionary`（`dictionary.ts`）を新設、`slow-dictionary.ts`の`SlowDictionary`
（従来`SubjectSlowSourcesDictionary`のみ集約）に合流させた（`ingame-params/buff-debuff/slow-dictionary.ts`の
既存コメントで「対応するモジュール側の宣言・ここでの集約はまだ未着手」と明記されていた箇所）。
武器スキル・戦術スキルの`slowSources`集約は引き続き未着手。

**注記（`critical_blow`）**: 「最大体力を超えた回復量が追加体力に変換される」効果は、実際の変換量が
発動時の現在体力（＝失った体力）に依存するが、`buffDebuff`は現在体力を受け取れない。理論上の最大値
（失った体力が最大＝現在体力0のときの回復量。`status.maxHp`を「最大の失った体力」の代わりに使う）を
`maxHp`への自己バフ（ON/OFF）として実装した（`CharacterState/Group/Name/6046010`「最大体力増加」と
一致する表記で、この解釈の妥当性を裏付け）。

- [x] awakening（覚醒）
- [x] biotic_infusion（意念）
- [x] biotic_infusion_vf（意念）
- [x] blasting_bullet（ブラスター弾丸）
- [x] blaze_of_glory（光輝）
- [x] blaze_up（予熱）
- [x] blaze_up_amplified（予熱 - 増幅）
- [x] blaze_up_endurance（予熱 - 忍耐）
- [x] blaze_up_enhanced（予熱 - 強化）
- [x] blaze_up_outburst（予熱 - 激昂）
- [x] bloodpact（セカンドウインド - 血の契約）
- [x] brute_enforcer（執行人）
- [x] cataclasm（破裂）
- [x] charge_carrier（迅速 - プラズマ）
- [x] chasing_needle（ホーミングニードル）
- [x] circulation（情熱 - 循環）
- [x] colossal（セカンドウインド - 巨人）
- [x] combat_instinct（開始）
- [x] convergence（凝集）
- [x] critical_blow（クリティカル·ブロウ）
- [ ] crushing_blow（シャッターストライク）
- [ ] debilitation（腐敗）
- [ ] debilitation_fog（衰弱の霧）
- [ ] deferral（猶予）
- [ ] dimensional_rift（次元亀裂）
- [ ] electric_shock（電撃）
- [ ] encourage（激励）
- [ ] extended_fury（バレル延長）
- [ ] fáfnir's_scales（ファフニールの鱗）
- [ ] flame_barrier（炎の結界）
- [ ] flame_barrier_vf（炎の結界）
- [ ] gap（間隔）
- [ ] gold_pouch（金貨袋）
- [ ] guard_punch（ガードパンチ）
- [ ] gust_of_wind（突風 - 寒気）
- [ ] healing_reduction（治癒減少）
- [ ] heart_of_fire（劫火の心臓）
- [ ] heavyweight（鈍重）
- [ ] in_full_bloom（満開）
- [ ] iteration（リピートアクション）
- [ ] lead_shell（チャージ - 鉄丸）
- [ ] lichs_grasp（寒波）
- [ ] magic_bullet（魔弾）
- [ ] magnetic_midnight（チャージ - 閃光）
- [ ] mana_seed（魔力の種）
- [ ] master（達人）
- [ ] necrosis（毒蛇の猛毒）
- [ ] photon_launcher（フォトンランチャー）
- [ ] plague_butterfly（疫病の蝶）
- [ ] prayer_for_the_dead（死者のための祈り）
- [ ] predation（捕食）
- [ ] primodal_hex（呪い）
- [ ] pulverization（粉砕）
- [ ] punishment（懲罰）
- [ ] punishment_tracking（懲罰 - 追跡）
- [ ] quickstep（乱舞）
- [ ] rally（突風 - 結集）
- [ ] rebellion（反抗）
- [ ] reflection（リフレクション）
- [ ] resonance（追い打ち）
- [ ] rudra_embodied（迅速 - ルドラの短剣）
- [ ] rush（情熱 - 歓喜）
- [ ] security_protocol（保護プロトコル）
- [ ] smolder（発火）
- [ ] spirit_harvest（魂の収穫）
- [ ] spot_on（命中）
- [ ] streamlined（迅速）
- [ ] swift_strides（軽い足取り）
- [ ] swift_strides_vf（軽い足取り）
- [ ] tailwind（追い風）
- [ ] targeting_pod（照準ポッド）
- [ ] taser_gun（テーザー銃）
- [ ] taser_gun_surge（テーザー銃 - 跳躍）
- [ ] thunder_ruling（雷鳴の審判）
- [ ] time_edge（タイムエッジ）
- [ ] tranquility（明鏡止水）
- [ ] turbulence（激動）
- [ ] two_sides（二つの仮面）
- [ ] ultra_focus（超集中）
- [ ] vanguard（先鋒）
- [ ] verdict（宣告）
- [ ] vf_control_enhancement（VF制御強化）
- [ ] vigor（情熱）
- [ ] vitality_strike（再生の一撃）
- [ ] whirlwind（突風）
- [ ] zephyr（迅速 - そよ風）
