import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 照準射撃(Q) 的中時の自己攻撃速度増加
    "subject.katja.q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.katja.q-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1072210",
                value: {
                    type: "constant",
                    value: Constants.Q.attack_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // 接近禁止(E) 的中時の自己移動速度増加
    "subject.katja.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.katja.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1072410",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect * stack
                }
            }]
        })
    }
});

// 接近禁止(E)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.katja.e-slow", values: Constants.E.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
