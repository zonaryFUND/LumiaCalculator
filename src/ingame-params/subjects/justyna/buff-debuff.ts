import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // アストラバースト(R) 使用中の自己移動速度減少
    "subject.justyna.r-slow": {
        origin: "skill",
        nameIntlID: "subject.justyna.r-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.justyna.r-slow",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed_penalty * -1 * stack
                }
            }]
        })
    }
});

// 殲滅砲撃(Q2)・集中砲撃(W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.justyna.q2-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.justyna.w-slow", values: Constants.W.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
