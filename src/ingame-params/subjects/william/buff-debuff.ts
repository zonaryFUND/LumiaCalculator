import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = config => ({
    // シャドウボール(Q) 効果中の自己攻撃速度増加
    "subject.william.q-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.william.q-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1032200",
                value: {
                    type: "constant",
                    value: Constants.Q.attack_speed[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // ワインドアップ(W) マウンド上での自己防御力増加
    "subject.william.w-defense": {
        origin: "skill",
        nameIntlID: "subject.william.w-defense",
        maxStack: 1,
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1032320",
                value: {
                    type: "constant",
                    value: Constants.W.defense[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // スライディングキャッチ(E) ボールの方向へ移動する時の自己移動速度増加
    "subject.william.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.william.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1032420",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // キャッチボール(T) ボール拾得後の自己基本攻撃射程増加
    "subject.william.t-range": {
        origin: "skill",
        nameIntlID: "subject.william.t-range",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1032120",
                value: {
                    type: "constant",
                    value: Constants.T.range.effect * stack
                }
            }]
        })
    }
});

// ワインドアップ(W)・ウイニングショット(R、中心部/周囲部)の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.william.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.william.r-center-slow", values: [Constants.R.slow_center.effect] },
    { nameIntlID: "subject.william.r-outer-slow", values: [Constants.R.slow.effect] }
];
