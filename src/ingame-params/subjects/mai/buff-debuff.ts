import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // ショール·ベール(W) 効果中の自己被ダメージ減少・移動速度増加
    "subject.mai.w-buff": {
        origin: "skill",
        nameIntlID: "subject.mai.w-buff",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1045300",
                value: {
                    type: "constant",
                    value: Constants.W.damage_decline[config.skillLevels.W] * stack
                }
            }],
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1045300",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // フィナーレ(E再使用) 的中後の自己攻撃速度増加
    "subject.mai.e-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.mai.e-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1045420",
                value: {
                    type: "constant",
                    value: Constants.E.attack_speed.effect[config.skillLevels.E] * stack
                }
            }]
        })
    }
});

// ドレープ(Q)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.mai.q-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) }
];
