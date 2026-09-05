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

**注記（`deferral`は意図的に未実装）**: 「受けたダメージの20%を3秒間かけて後払いで受ける」というダメージ
遅延効果は、この計算機の静的な計算モデル（時間経過を扱わない）上での表現が難しく、厳密に表記する必要性も
低いと判断し、実装しない方針とした（`rio`のQと同様、要件確認は完了したうえでの意図的な非実装）。

**注記（`dimensional_rift`・新規Status項目`increaseDamagedRatio`）**: 「被ダメージ増加」（付与される
デバフ「次元不安定」、`preventDamageRatio`「被ダメージ減少」の逆方向）に対応するフィールドが
`ComponentStatus`になかったため新設した（`core/subject-dynamic/status/type.ts`・`calculation.ts`参照）。
`preventDamageRatio`と同様インタフェースのみで、対戦モードのダメージ計算（`core/damage-table/
mitigation.ts`）への反映は未実装（対戦モードでの対応を予定）。

**注記（`encourage`・味方に対する初の`givenBuffDebuff`、発生源レベル依存のstack表現）**: 効果対象が
敵ではなく味方（自分以外に治癒/シールドを与えた対象）である点が、これまでの`givenBuffDebuff`実装例
（型定義のコメントは「装備アビリティが他者（敵）に与える」）と異なる。`incomingBuffs`/
`IncomingBuffDebuffCatalog`の仕組み自体は敵味方を区別しないため無改修で問題なく、`type.ts`のコメントは
実態に合わせて修正した。adaptiveForceの増加量は発生源（装備者）のレベルに応じて変化するため、
`tactical-skill`の「プロトコル違反」と同じパターン（`stack`を1〜20＝レベルそのもの、0＝付与なしとして
表現し、`CommonLevelLabels(20)`を使う）を装備アビリティとしては初めて適用した。

**注記（`fáfnir's_scales`・防御力の固定値バフ、`combine-components.ts`のドキュメント更新）**: 防御力への
固定値バフ・デバフは、`docs/status-model.md`・`core/README.md`に「現状の合成エンジンでは表現できない
（要修正）」という未解決の既知課題として記載されていたが、実際には`calculateDefenseValue`
（`combine-components.ts`）が既に発生源で`sum`成分を分離し正しい順序（乗算の後に加算）で計算する形に
対応済みだった（ドキュメントが更新されていなかっただけ）。今回の実装にあたり両ドキュメントの記載を
「対応済み」に修正した。

**注記（`gap`・距離を扱えないための近似）**: 効果は「ダメージ発生源との距離に比例した被ダメージ減少」だが、
この計算機は実験体間の距離を扱わないため、距離が最大（効果量最大）の場合を仮定した`preventDamageRatio`
（既存の「被ダメージ減少、種別問わず」の枠）への自己バフ（ON/OFF）として近似した。最大減少量は
近接/遠隔武器で異なる（`weaponRangeOf(config)`で分岐）。l10nに専用のCharacterState表記が見当たらないため
`item-skills.json`に独自定義。

**注記（`gold_pouch`・野生動物処置量を扱えないための近似）**: 効果は「野生動物処置で得たクレジットに応じて
永続的に攻撃力増加（クレジット15につき+1）」だが、この計算機は野生動物処置量・獲得クレジットを扱わない。
処置量そのものではなく「獲得済みの攻撃力増加量」を`stack`として直接選択する形にした（1スタック=攻撃力+1、
最大20スタックで現実的な範囲をカバー）。あわせて、ツールチップ側でハードコードされていた
攻撃力換算値（`tooltip.ts`の`7: 1`）を`constants.json`の`attack_per_credit_unit`に切り出し、
バフ・デバフ側と共有した。

**注記（`heavyweight`は既存の`perpetual-status.ts`のバグを修正）**: 既に実装済みだった`perpetualStatus`
（追加体力の2%ぶんの攻撃力を常時獲得）の`intlID`が、実在しない生の日本語文字列`"鈍重"`になっており、
`FormattedMessage`のIntlメッセージIDとしては本来無効だった（未登録IDに対するreact-intlのフォールバック
表示でたまたま正しく見えていただけ）。実在する`CharacterState/Group/Name/6077000`「鈍重 - 攻撃力増加」に
修正。この修正だけで「自己バフ（自動発動）」セクション（`auto-self-buffs.tsx`、`origin: "perpetual_status"`
かつ`intlID`を持つ要素を自動的に拾う）に正しく表示されるようになるため、表示のための追加実装は不要だった。

**注記（`healing_reduction`は装備ごとの個別エントリから汎用デバフに変更、かつ等級で効果量が異なる）**:
当初は他の装備アビリティ同様`givenBuffDebuff`で装備ごとに個別のカタログエントリを作っていたが、この
アビリティを共有する装備が非常に多いことから、選択肢が同じ内容のデバフで埋め尽くされる問題が判明。
移動速度減少（`generic-slow.ts`）と同じ「汎用デバフ1本にまとめる」方針に切り替え、`ingame-params/
buff-debuff/generic-healing-reduction.ts`（`origin: "generic"`）を新設して`incoming-catalog.ts`に
合流させた。`healing_reduction/index.ts`の`givenBuffDebuff`は削除（コメントで経緯を記載）。

さらに、効果量は当初「常に同一」としていたが誤りで、実際は装備の等級（`EquipmentStatus.itemGrade`）に
よって英雄・伝説＝20%、神話＝30%と異なる（過去のテコ入れ後の再調整パッチによる）ことが判明したため、
汎用デバフを2エントリ（`generic.healing-reduction.epic-legend`・`generic.healing-reduction.mythic`）に
分割した。名称には実験体固有スキル・特性由来の治癒効果減少との混同を避けるため「装備による」を含めている。
また`healing_reduction/tooltip.ts`（個別装備のツールチップ本文）も、装備の等級に応じた値を表示できるよう
修正が必要だった。`EquipmentAbilityTooltipValues`は元々装備の等級を受け取れない仕様だったため、
`itemGrade`を新たに追加し、呼び出し元（`components/tooltip/item/skill.tsx`・`item-tooltip.tsx`）から
`EquipmentStatus.itemGrade`を渡す配線を追加した（この情報を必要とする既存の他アビリティは今のところ
ないため、後方互換の問題はない）。

**注記（`lead_shell`・`magnetic_midnight`は「チャージ」系統でCharacterStateを共有）**: いずれもスロウを持つが
発動源が別（`lead_shell`は次の基本攻撃、`magnetic_midnight`も同様）で、`slowSources`のnameIntlIDには
共通の`CharacterState/Group/Name/6013010`「チャージ：スロー」を使う。`magnetic_midnight`は装備により
効果量が異なる（20%/25%の2種類を`armor-skill.json`・`weapon-skill.json`から確認）。

**注記（`lichs_grasp`・`weapon-skill.json`側にのみ実アイテムが存在）**: `code: [6019001, 6019002,
6019005]`のうち、`armor-skill.json`には`6019002`（スロウのみ、装備2件）しか見つからなかったが、
`weapon-skill.json`側に`6019001`（スロウ+攻撃速度減少、武器5件）が存在した（`6019005`＝攻撃速度のみ版は
現時点で実アイテムなし）。要件にあった「女帝 寒波 攻撃速度減少部分」という表記は、`incoming-buffs.tsx`が
`nameIntlID`の前に発生源アイテム名（`incomingBuffSourceIntlID`経由の`sourceIntlID`）を自動的に付与する
既存の仕組みにより、`nameIntlID`側は「寒波 - 攻撃速度減少部分」だけを定義すれば自動的に実現される
（`self-buffs.tsx`の自己バフと同じ「発生源名は別枠で表示」という設計。`item-skills.json`に独自定義）。
スロウ部分は装備により25%・99%の2種類を確認、`slowSources`に反映した。

**注記（`mana_seed`・`iteration`が既存の`ultCooldownReduction`計算バグを表面化）**: `mana_seed`（最大
スタック時にクールダウン減少+20）を装備した状態でスタックを最大にすると、通常のクールダウン減少は
正しく反映される一方、究極技クールダウン減少の表示が負の値になる不具合をユーザーが発見。原因は
`calculation.ts`側にあり（装備由来の通常CDRだけを個別に複製する設計で、バフ・デバフ由来の通常CDRが
究極技側に一切反映されていなかった）、`mana_seed`・`iteration`（ともに`cooldownReduction`へ書き込む
初めてのバフ・デバフだった）がこれを表面化させた形。`core/README.md`項目12で修正済み
（`withUltCooldownReduction()`を新設）。

**注記（`pulverization`・moveSpeedへの初の固定値（`sum`）バフ）**: 移動速度バフは既存例すべて`%`
（`calculationType: "mul"`）で、`docs/status-model.md`のmoveSpeed項目の説明文もバフ・デバフの割合適用を
前提にした記述だが、`pulverization`の効果（ダメージ後の移動速度増加）はゲーム内表記に`%`が付かない
固定値（`Constants.ms.effect = 0.06`）。`calculateMovementSpeedValue`（`combine-components.ts`）自体は
`sum`成分を発生源を問わず汎用的に扱う実装になっている（`calculateDefenseValue`のような発生源別の特別
処理は不要）ため、`calculationType: "sum"`で実装した。他に前例がない組み合わせのため、実機の挙動と
食い違いがあれば要修正。

**注記（`punishment`はバフ・デバフなし）**: 「自身に移動速度増加バフ」という当初の要件は
`punishment_tracking`との取り違いだったことが確認された。ゲーム内表記・アイテムデータのいずれにも
移動速度への言及がなく（シールド関連の値のみ）、コード変更なし。

**注記（`rebellion`・`perpetualStatus`による自動発動バフ第2例）**: 失った体力に比例して攻撃力割合が
増加する（体力100%で0%、`max_hp`（40）%以下で`max_effect`（12）%に飽和、その間は線形補間）永続効果を
`perpetualStatus`として実装した（`blaze_of_glory`に続く2例目）。「自己バフ（自動発動）」セクションへの
表示は既存の仕組み（`auto-self-buffs.tsx`）がそのまま対応するため追加実装は不要。l10nに専用の
CharacterState表記が見当たらないため`item-skills.json`に独自定義。

**注記（`reflection`は`healing_reduction`の汎用デバフに統合、個別実装なし）**: 与える治癒減少効果
（常に20%固定）が「装備による治癒減少（英雄・伝説）」（`generic-healing-reduction.ts`の
`generic.healing-reduction.epic-legend`）と完全に一致しているため、個別の`givenBuffDebuff`は実装せず、
既存の汎用デバフでカバーされているものとみなした（`reflection/index.ts`にコメントで前提を記載。
この装備の等級や20%という数値が将来変わった場合は要見直し）。

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
- [x] crushing_blow（シャッターストライク）
- [x] debilitation（腐敗）
- [x] debilitation_fog（衰弱の霧）
- [x] deferral（猶予）
- [x] dimensional_rift（次元亀裂）
- [x] electric_shock（電撃）
- [x] encourage（激励）
- [x] extended_fury（バレル延長）
- [x] fáfnir's_scales（ファフニールの鱗）
- [x] flame_barrier（炎の結界）
- [x] flame_barrier_vf（炎の結界）
- [x] gap（間隔）
- [x] gold_pouch（金貨袋）
- [x] guard_punch（ガードパンチ）
- [x] gust_of_wind（突風 - 寒気）
- [x] healing_reduction（治癒減少）
- [x] heart_of_fire（劫火の心臓）
- [x] heavyweight（鈍重）
- [x] in_full_bloom（満開）
- [x] iteration（リピートアクション）
- [x] lead_shell（チャージ - 鉄丸）
- [x] lichs_grasp（寒波）
- [x] magic_bullet（魔弾）
- [x] magnetic_midnight（チャージ - 閃光）
- [x] mana_seed（魔力の種）
- [x] master（達人）
- [x] necrosis（毒蛇の猛毒）
- [x] photon_launcher（フォトンランチャー）
- [x] plague_butterfly（疫病の蝶）
- [x] prayer_for_the_dead（死者のための祈り）
- [x] predation（捕食）
- [x] primodal_hex（呪い）
- [x] pulverization（粉砕）
- [x] punishment（懲罰）
- [x] punishment_tracking（懲罰 - 追跡）
- [x] quickstep（乱舞）
- [x] rally（突風 - 結集）
- [x] rebellion（反抗）
- [x] reflection（リフレクション）
- [x] resonance（追い打ち）
- [x] rudra_embodied（迅速 - ルドラの短剣）
- [x] rush（情熱 - 歓喜）
- [x] security_protocol（保護プロトコル）
- [x] smolder（発火）
- [x] spirit_harvest（魂の収穫）
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
