import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5, SkillKeyLabels } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    "subject.magnus.passive": {
        origin: "skill",
        nameIntlID: "subject.magnus.passive",
        maxStack: Constants.T.max_stack,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1004100",
                value: {
                    type: "constant",
                    value: Constants.T.defense[config.skillLevels.T] * stack
                }
            }],
            ...(stack == Constants.T.max_stack ? {
                hpRegen: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1004110",
                    value: {
                        type: "constant",
                        value: Constants.T.hpRegen[config.skillLevels.T]
                    }
                }]
            } : {})
        })
    }
})

// 移動速度減少（スロウ）は汎用デバフ（buff-debuff/generic-slow.ts）1本にまとめるため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: SkillKeyLabels.Q, values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
]
