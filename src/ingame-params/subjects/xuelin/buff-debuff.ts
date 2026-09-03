import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// 無塵剣訣(W)・流雲剣雨(E)・万剣帰宗(R、領域内剣落下強化時)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.xuelin.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.xuelin.e-slow", values: [Constants.E.slow.effect] },
    { nameIntlID: "subject.xuelin.r-slow", values: [Constants.R.slow.effect] }
];
