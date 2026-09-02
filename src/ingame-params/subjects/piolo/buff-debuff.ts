import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 双節乱舞(Q1) チャージ中の自己移動速度減少
    "subject.piolo.q1-self-slow": {
        origin: "skill",
        nameIntlID: "subject.piolo.q1-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.piolo.q1-self-slow",
                value: {
                    type: "constant",
                    value: Constants.Q1.movement_speed_penalty * -1 * stack
                }
            }]
        })
    },
    // 弾き(W1) チャージ中の自己移動速度減少
    "subject.piolo.w1-self-slow": {
        origin: "skill",
        nameIntlID: "subject.piolo.w1-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1056300",
                value: {
                    type: "constant",
                    value: Constants.W1.movement_speed_penalty * -1 * stack
                }
            }]
        })
    },
    // 絡め捕り(E1) チャージ中の自己移動速度減少
    "subject.piolo.e1-self-slow": {
        origin: "skill",
        nameIntlID: "subject.piolo.e1-self-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1056420",
                value: {
                    type: "constant",
                    value: Constants.E1.movement_speed_penalty * -1 * stack
                }
            }]
        })
    },
    // 振り回し(W2) 発動時の自己移動速度増加
    "subject.piolo.w2-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.piolo.w2-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1056320",
                value: {
                    type: "constant",
                    value: Constants.W2.movement_speed * stack
                }
            }]
        })
    },
    // パニッシャー(R) 鍛錬の成果スタック保有時の自己攻撃速度増加
    "subject.piolo.r-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.piolo.r-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.piolo.r-attack-speed",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed[config.skillLevels.R] * stack
                }
            }]
        })
    }
});

// 打ち下ろし(Q2)中央部の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.piolo.q2-center-slow", values: [Constants.Q2.slow.effect] }
];
