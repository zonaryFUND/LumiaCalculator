import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 電気ノコギリ殺人鬼(R) 効果中の自己攻撃速度・移動速度増加
    "subject.jackie.r-buff": {
        origin: "skill",
        nameIntlID: "subject.jackie.r-buff",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1001500",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed[config.skillLevels.R] * stack
                }
            }],
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1001500",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed[config.skillLevels.R] * stack
                }
            }]
        })
    }
});

// 四肢絶断(W)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.jackie.w-slow", values: Constants.W.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
