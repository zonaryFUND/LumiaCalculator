import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // シャドーシザース(Q) 的中時の自己攻撃速度増加
    "subject.daniel.q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.daniel.q-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1037210",
                value: {
                    type: "constant",
                    value: Constants.Q.basic_attack_enhance.attack_speed[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // シャドーグライド(E) 状態中の自己基本攻撃射程固定
    "subject.daniel.e-attack-range": {
        origin: "skill",
        nameIntlID: "subject.daniel.e-attack-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "fix",
                intlID: "CharacterState/Group/Name/1037400",
                value: {
                    type: "constant",
                    // calculateStatusValue()のfix適用は値の真偽判定（0は「固定しない」扱い）に依存するため、
                    // 他の効果と同様に`* stack`で0/非0を切り替える
                    value: Constants.E.basic_attack_range * stack
                }
            }]
        })
    },
    // 孤独な芸術家(T) 夜間の自己視界増加・移動速度増加（同一バフ）
    "subject.daniel.t-buff": {
        origin: "skill",
        nameIntlID: "subject.daniel.t-buff",
        maxStack: 1,
        buff: stack => ({
            sightRange: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1037100",
                value: {
                    type: "constant",
                    value: Constants.T.vision[config.skillLevels.T] * stack
                }
            }],
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1037100",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // インスピレーション(W) 刻印対象の視界減少
    "subject.daniel.w-vision-decrease": {
        origin: "skill",
        nameIntlID: "subject.daniel.w-vision-decrease",
        maxStack: 1,
        buff: stack => ({
            sightRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1037310",
                value: {
                    type: "constant",
                    value: Constants.W.vision_decrease * -1 * stack
                }
            }]
        })
    }
};

// Q（シャドーシザース中心部）・W（インスピレーション爆発）の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.daniel.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.daniel.w-slow", values: [Constants.W.slow.effect] }
];
