import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    // 17対1(W) 効果中の自己妨害耐性増加
    "subject.magnus.w-tenacity": {
        origin: "skill",
        nameIntlID: "subject.magnus.w-tenacity",
        maxStack: 1,
        buff: stack => ({
            tenacity: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1004300",
                value: {
                    type: "constant",
                    value: Constants.W.tenacity * stack
                }
            }]
        })
    },
    // 根性(T) スタックによる自己防御力増加。最大スタック時はさらに体力再生が増加する
    "subject.magnus.t-buff": {
        origin: "skill",
        nameIntlID: "subject.magnus.t-buff",
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

// 破砕弾(Q)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.magnus.q-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
]
