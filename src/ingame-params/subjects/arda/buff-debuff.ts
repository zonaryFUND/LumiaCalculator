import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

// Wの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// R強化版のW（Constants.R.W.slow）はWと全く同じ効果量（duration 0.3・effect 50）のため、辞書には
// Wの1件のみ登録する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.arda.w-slow", values: [Constants.W.slow.effect] }
];
