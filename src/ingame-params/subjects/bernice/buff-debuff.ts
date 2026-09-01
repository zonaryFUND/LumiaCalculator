import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 鷹の目(E) 持続効果中、狩り刻印対象者へ向かうときの自己移動速度増加
    "subject.bernice.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.bernice.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1025420",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // 鷹の目(E) 使用時の自己視界増加
    "subject.bernice.e-vision": {
        origin: "skill",
        nameIntlID: "subject.bernice.e-vision",
        maxStack: 1,
        buff: stack => ({
            sightRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1025430",
                value: {
                    type: "constant",
                    value: Constants.E.vision[config.skillLevels.E] * stack
                }
            }]
        })
    }
});

// Qの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.bernice.q-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.bernice.q-enhanced-slow", values: Constants.Q.enhanced_slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
