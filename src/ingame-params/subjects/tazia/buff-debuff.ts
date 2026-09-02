import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// プリジア(E)・パラディーソ(R、範囲内/大剣着地的中)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない。Rは範囲内と大剣着地的中で効果量が異なるため、それぞれ別項目として
// 登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.tazia.e-slow", values: [Constants.E.slow.effect] },
    { nameIntlID: "subject.tazia.r-range-slow", values: [Constants.R.slow] },
    { nameIntlID: "subject.tazia.r-hit-slow", values: [Constants.R.hit_slow.effect] }
];
