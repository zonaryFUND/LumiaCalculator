import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 紫水晶の波(E) 自己移動速度増加
    "subject.eva.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.eva.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1036410",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // テレキネシス(T) 自己基本攻撃射程増加
    "subject.eva.t-attack-range": {
        origin: "skill",
        nameIntlID: "subject.eva.t-attack-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1036110",
                value: {
                    type: "constant",
                    value: Constants.T.basic_attack_range * stack
                }
            }]
        })
    }
});

// W（位相の渦）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.eva.w-slow", values: [Constants.W.slow] }
];
