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

- **完全に同一の表記**: `circulation`（情熱）と`vigor`（情熱）— ディレクトリ名からは無関係に見えるが
  日本語表記は全く同じ。`skill.tsx`にも`sanitizedCode`という専用の回避コードがあるほど紛らわしい
  （`6017006`→`6017005`のコード不一致対応。Vigor-Circulationとコメントされている）
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

**注記（`blaze_of_glory`は表示専用の宣言のみで、ダメージ計算には未反映）**: 効果は「与えるスキルダメージ増加」
（`docs/damage-model.md`「スキルダメージ増加効果」参照）であり、`skillAmp`（スキル増幅。別のステータス）
では代用できない。この効果種別自体を計算に反映する仕組みがこの計算機にまだ存在しない
（同種の効果を持つ`brute_enforcer`「執行人」・`blaze_up_amplified`「予熱 - 増幅」も同様に未実装。一般的な
設計・実装は`docs/known-issues.md`「『与えるスキルダメージ増加』効果を計算に反映する仕組みがない」参照。
増幅ドローン型「ダメージ種別で判定」と執行人型「発生源スキルの種類で判定」という2種の適用条件の区別が
必要なため、本チェックリストの通常の1件ずつのペースでは進めず別途まとめて設計する）。

ただし「バフ欄から効果が消える・現在HPの状態が見えない」のは避けたいため、`EquipmentAbilityModule`に
`givenSkillDamageIncrease`（`perpetualStatus`と同じ`(config, currentHPRatio) => ...`シグネチャだが、
`StatusValueComponent`ではなく単一の数値を返す。ダメージ計算・Statusには一切影響しない）を追加し、
`blaze_of_glory`はこれで宣言している。「自己バフ（自動発動）」セクションに、他の行と区別できる注記
（「（未実装：ダメージ計算に反映されません）」）付きで表示される。計算に反映する仕組みができ次第、
`perpetualStatus`/`buffDebuff`による正式な実装に置き換えて`givenSkillDamageIncrease`は削除すること。
ツールチップの体力閾値表記漏れ（`constants.json`の`hp_threshold`欠落）は修正済み。

**注記（`blaze_up`系統）**: `blaze_up`（予熱・攻撃速度スタック）と`blaze_up_enhanced`（予熱 - 強化・
攻撃力スタック）は、ゲーム内表示・`CharacterState`グループIDがともに`6052000`「予熱」で共通の
武器種違い実装（`awakening`の速度/防御貫通版と同型）のため、`buffDebuff`のローカルidも
`item-skill.blaze-up`に統一している。`blaze_up_amplified`（予熱 - 増幅）は1スタックごとの「与える
スキルダメージ増加」を持つため`docs/known-issues.md`「『与えるスキルダメージ増加』効果を計算に反映する
仕組みがない」の対象（`givenSkillDamageIncrease`による表示専用の暫定対応）。最大スタック時の追加効果
（ダメージ吸血または移動速度、装備により異なる）は通常の`buffDebuff`で実装済み。`blaze_up_endurance`
（予熱 - 忍耐）は既存実装がそのまま要件と一致していたため変更なし。

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
- [ ] bloodpact（セカンドウインド - 血の契約）
- [ ] brute_enforcer（執行人）
- [ ] cataclasm（破裂）
- [ ] charge_carrier（迅速 - プラズマ）
- [ ] chasing_needle（ホーミングニードル）
- [ ] circulation（情熱）
- [ ] colossal（セカンドウインド - 巨人）
- [ ] combat_instinct（開始）
- [ ] convergence（凝集）
- [ ] critical_blow（クリティカル·ブロウ）
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
