import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// Rの4レベル融合爆弾爆発的中時の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.celine.r-slow", values: [Constants.R.slow.effect] }
];
