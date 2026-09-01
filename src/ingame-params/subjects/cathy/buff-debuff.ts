import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 外傷/致命的外傷(T) 状態の敵へ向かって移動するときの自己移動速度増加
    "subject.cathy.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.cathy.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1023150",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 致命的外傷(T) 状態の対象への治癒効果減少
    "subject.cathy.t-healing-reduction": {
        origin: "skill",
        nameIntlID: "subject.cathy.t-healing-reduction",
        maxStack: 1,
        buff: stack => ({
            hpHealedDecreaseRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1023110",
                value: {
                    type: "constant",
                    value: Constants.T.healing_reduction * stack
                }
            }]
        })
    }
};

// W外側の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.cathy.w-slow", values: [Constants.W.slow.effect] }
];
