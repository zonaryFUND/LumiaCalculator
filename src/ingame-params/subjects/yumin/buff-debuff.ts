import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // 仙力(T) 風雲地帯内の自己移動速度増加
    "subject.yumin.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.yumin.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1077300",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed * stack
                }
            }]
        })
    }
});

// 旋風(W)・風流雲散(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.yumin.w-slow", values: Constants.W.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.yumin.r-slow", values: [Constants.R.slow.effect] }
];
