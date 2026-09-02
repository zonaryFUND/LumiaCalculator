# 実験体バフ・デバフ実装チェックリスト

実験体ごとに、ユーザーが「この実験体にはこの自己バフ（`buffDebuff`）とこの他者向けバフ・デバフ
（`givenBuffDebuff`）が実装されている」と要件を伝え、実装後にユーザーがレビューする流れをアルファベット順
（ディレクトリ名基準）に進める。移動速度減少（スロウ）は個別実装せず、汎用デバフ（`ingame-params/
buff-debuff/generic-slow.ts`）1本にまとめ、発生源側は参照専用の`slowSources`（`buff-debuff.ts`）にのみ
登録する（[ingame-params/README.md](../README.md)参照）。

チェック済み = 要件確認・実装・レビューが完了した状態（その実験体にバフ・デバフが存在しないことの確認のみ
で完了する場合を含む）。

**注記**: `magnus`（自己バフ・スロウ辞書サンプル）・`darko`（他者バフサンプル）は、汎用スロウ・バフ/デバフ
インターフェース自体の検証用サンプルとして先行実装済みだったが、本チェックリストに基づく要件確認・レビューを
それぞれ完了済み（`magnus`はW妨害耐性増加の実装漏れと表記ゆれを修正、`darko`は要件確認のみで修正なし）。

**注記（isol）**: `isol`のW（火網）与えデバフ（`givenBuffDebuff`）は、`givenBuffDebuff`が発生源のconfig
（＝Wのスキルレベル）を保持できない制約を、現行バージョンの効果量パターン（Lv1,2=2/Lv3,4=3/Lv5=4の
3パターンのみ）に依存して「Lv1,2のW」「Lv3,4のW」「Lv5のW」の3項目に分割することで回避している
（`isol/buff-debuff.ts`のコメント参照）。将来のバランス調整でこの3パターン集約が成立しなくなった場合は
分割方針自体の見直しが必要。

**注記（rio）**: `rio`のQ（替弓）の皆中バフ（短弓時: 自己移動速度・攻撃速度増加／和弓時: 自己基本攻撃
射程増加＋対象の失った体力比例基本攻撃ダメージ増加）は、切り替え条件の特殊性・既存`fix`機構では
表現できない可能性のある射程補正の挙動・対戦モード専用の独自ロジックが必要な点から、専用インタフェースの
設計を後回しにして未実装（`rio/buff-debuff.ts`の詳細コメント参照）。莉央は既に基本攻撃威力について
特別な計算式（`t.ts`のRioTStrategy）の対象になっており、Qの皆中バフも同様に専用実装が必要になる見込み。

- [x] abigail（アビゲイル）
- [x] adela（アデラ）
- [x] adina（アディナ）
- [x] adriana（アドリアナ）
- [x] aiden（エイデン）
- [x] alex（アレックス）
- [x] alonso（アロンソ）
- [x] arda（アルダ）
- [x] aya（アヤ）
- [x] barbara（バーバラ）
- [x] bernice（バニス）
- [x] bianca（ビアンカ）
- [x] bihyung（ビヒョン）
- [x] blair（ブレア）
- [x] camilo（カミロ）
- [x] cathy（キャッシー）
- [x] celine（セリーヌ）
- [x] charlotte（シャーロット）
- [x] chiara（キアラ）
- [x] chloe（クロエ）
- [x] coraline（コラライン）
- [x] craver（クレイヴァー）
- [x] daniel（ダニエル）
- [x] darko（ダルコ）
- [x] debi_marlene（デビー&マーリン）
- [x] echion（エキオン）
- [x] elena（エレナ）
- [x] eleven（Eleven）
- [x] emma（エマ）
- [x] estelle（エステル）
- [x] eva（エヴァ）
- [x] felix（フェリックス）
- [x] fenrir（フェンリル）
- [x] fiora（フィオラ）
- [x] garnet（ガーネット）
- [x] hart（ハート）
- [x] haze（ヘイズ）
- [x] henry（ヘンリー）
- [x] hisui（ヒスイ）
- [x] hyejin（ヘジン）
- [x] hyunwoo（ヒョヌ）
- [x] irem（イレム）
- [x] isaac（アイザック）
- [x] isol（アイソル）
- [x] istván（イシュトヴァーン）
- [x] jackie（ジャッキー）
- [x] jan（ヤン）
- [x] jenny（ジェニー）
- [x] johann（ヨハン）
- [x] justyna（ユスティナ）
- [x] karla（カーラ）
- [x] katja（カティア）
- [x] kenneth（ケネス）
- [x] laura（ラウラ）
- [x] leni（レニ）
- [x] lenore（レノア）
- [x] lenox（レノックス）
- [x] leon（レオン）
- [x] li_dailin（ダイリン）
- [x] lucia（ルチア）
- [x] luke（ルク）
- [x] ly_anh（イアン）
- [x] magnus（マグヌス）
- [x] mai（マイ）
- [x] markus（マーカス）
- [x] martina（マルティナ）
- [x] mirka（ミルカ）
- [x] nadine（ナディン）
- [x] nathapon（ナタポン）
- [x] niah（ニア）
- [x] nicky（ニッキー）
- [x] piolo（ピオロ）
- [x] priya（プリヤ）
- [ ] rio（莉央）
- [x] rozzi（ロッジ）
- [x] shoichi（彰一）
- [x] silvia（シルヴィア）
- [x] sissela（シセラ）
- [x] sua（スア）
- [x] tazia（タジア）
- [ ] theodore（テオドール）
- [ ] tia（ティア）
- [ ] tsubame（つばめ）
- [ ] vanya（ヴァーニャ）
- [ ] william（ウィリアム）
- [ ] xiukai（シウカイ）
- [ ] xuelin（シュリン）
- [ ] yuki（雪）
- [ ] yumin（ユミン）
- [ ] zahir（ザヒル）
