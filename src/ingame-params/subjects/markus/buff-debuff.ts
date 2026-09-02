import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 戦闘教範(Q) 効果中の自己攻撃速度増加
    "subject.markus.q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.markus.q-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1053200",
                value: {
                    type: "constant",
                    value: Constants.Q.attack_speed[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // 戦闘教範(Q) 敵に向かって移動するときの自己移動速度増加
    "subject.markus.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.markus.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1053230",
                value: {
                    type: "constant",
                    value: Constants.Q.movement_speed.effect[config.skillLevels.Q] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 破壞(R) 的中対象への防御力減少
    "subject.markus.r-defense-down": {
        origin: "skill",
        nameIntlID: "subject.markus.r-defense-down",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1053530",
                value: {
                    type: "constant",
                    value: Constants.R.defense_down.effect * -1 * stack
                }
            }]
        })
    }
};

// 地殻変動(R)・ショック(T)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.markus.r-slow", values: [Constants.R.slow.effect] },
    { nameIntlID: "subject.markus.t-slow", values: [Constants.T.slow.effect] }
];
