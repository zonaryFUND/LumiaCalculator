import Constants from "./constants";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

// W・R（スピア設置時）・T（装填ゲージ最大時基本攻撃的中時）の移動速度減少は汎用デバフ
// （buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.karla.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.karla.r-slow", values: Constants.R.slow, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) },
    { nameIntlID: "subject.karla.t-slow", values: [Constants.T.slow.effect] }
];
