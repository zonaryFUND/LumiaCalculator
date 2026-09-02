import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // 忍び足(W) 自己移動速度増加。攻撃速度増加とは持続時間が異なるため別バフとして定義する
    "subject.tsubame.w-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.tsubame.w-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1070300",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // 忍び足(W) 自己攻撃速度増加
    "subject.tsubame.w-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.tsubame.w-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1070310",
                value: {
                    type: "constant",
                    value: Constants.W.attack_speed[config.skillLevels.W] * stack
                }
            }]
        })
    }
});

// 手裏剣投擲(Q)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.tsubame.q-slow", values: [Constants.Q.slow] }
];
