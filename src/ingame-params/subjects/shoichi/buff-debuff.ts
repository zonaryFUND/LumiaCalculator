import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// 協商(E)・無慈悲(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.shoichi.e-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.shoichi.r-slow", values: [Constants.R.slow.effect] }
];
