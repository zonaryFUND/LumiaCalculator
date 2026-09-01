# 実験体バフ・デバフ実装チェックリスト

実験体ごとに、ユーザーが「この実験体にはこの自己バフ（`buffDebuff`）とこの他者向けバフ・デバフ
（`givenBuffDebuff`）が実装されている」と要件を伝え、実装後にユーザーがレビューする流れをアルファベット順
（ディレクトリ名基準）に進める。移動速度減少（スロウ）は個別実装せず、汎用デバフ（`ingame-params/
buff-debuff/generic-slow.ts`）1本にまとめ、発生源側は参照専用の`slowSources`（`buff-debuff.ts`）にのみ
登録する（[ingame-params/README.md](../README.md)参照）。

チェック済み = 要件確認・実装・レビューが完了した状態（その実験体にバフ・デバフが存在しないことの確認のみ
で完了する場合を含む）。

**注記**: `magnus`（自己バフ・スロウ辞書サンプル）・`darko`（他者バフサンプル）は、汎用スロウ・バフ/デバフ
インターフェース自体の検証用サンプルとして先行実装済みだが、本チェックリストに基づく要件確認・レビューは
まだ経ていない。アルファベット順の該当箇所で改めて確認する。

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
- [ ] eva（エヴァ）
- [ ] felix（フェリックス）
- [ ] fenrir（フェンリル）
- [ ] fiora（フィオラ）
- [ ] garnet（ガーネット）
- [ ] hart（ハート）
- [ ] haze（ヘイズ）
- [ ] henry（ヘンリー）
- [ ] hisui（ヒスイ）
- [ ] hyejin（ヘジン）
- [ ] hyunwoo（ヒョヌ）
- [ ] irem（イレム）
- [ ] isaac（アイザック）
- [ ] isol（アイソル）
- [ ] istván（イシュトヴァーン）
- [ ] jackie（ジャッキー）
- [ ] jan（ヤン）
- [ ] jenny（ジェニー）
- [ ] johann（ヨハン）
- [ ] justyna（ユスティナ）
- [ ] karla（カーラ）
- [ ] katja（カティア）
- [ ] kenneth（ケネス）
- [ ] laura（ラウラ）
- [ ] leni（レニ）
- [ ] lenore（レノア）
- [ ] lenox（レノックス）
- [ ] leon（レオン）
- [ ] li_dailin（ダイリン）
- [ ] lucia（ルチア）
- [ ] luke（ルク）
- [ ] ly_anh（イアン）
- [ ] magnus（マグヌス）
- [ ] mai（マイ）
- [ ] markus（マーカス）
- [ ] martina（マルティナ）
- [ ] mirka（ミルカ）
- [ ] nadine（ナディン）
- [ ] nathapon（ナタポン）
- [ ] niah（ニア）
- [ ] nicky（ニッキー）
- [ ] piolo（ピオロ）
- [ ] priya（プリヤ）
- [ ] rio（莉央）
- [ ] rozzi（ロッジ）
- [ ] shoichi（彰一）
- [ ] silvia（シルヴィア）
- [ ] sissela（シセラ）
- [ ] sua（スア）
- [ ] tazia（タジア）
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
