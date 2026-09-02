import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// W・Eの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.lenox.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.lenox.e-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
