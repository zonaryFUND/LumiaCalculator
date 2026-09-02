import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// スナップ写真(Q)の的中対象への移動速度減少・攻撃速度減少（CharacterState/Group/Name/1034210・1034230）は、
// 公式ツールチップに効果の存在は記載されているものの具体的な割合が開示されておらず、constants.tsにも
// 対応する数値が存在しないため、実装せずコメントのみ残す

// タイムラプス(W)・インスタントフォト(E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.nathapon.w-slow", values: [Constants.W.slow] },
    { nameIntlID: "subject.nathapon.e-slow", values: [Constants.E.slow.effect] }
];
