import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 召し上がれ！(Q)・みんな集中！(W) チャージ中の自己移動速度減少（共通）
    "subject.eleven.charging-slow": {
        origin: "skill",
        nameIntlID: "subject.eleven.charging-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1030200",
                value: {
                    type: "constant",
                    value: Constants.common.charging_slow_penalty * -1 * stack
                }
            }]
        })
    },
    // みんな集中！(W) 被ダメージ減少（フルチャージ時最大値、レベル依存）
    "subject.eleven.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.eleven.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1030220",
                value: {
                    type: "constant",
                    value: Constants.W.max_damage_reduction[config.skillLevels.W] * stack
                }
            }]
        })
    }
});

// Q（召し上がれ！）的中対象への移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。
// チャージ時間に応じて最小値〜最大値まで連続的に変化するため、両端の値を辞書に登録する
export const slowSources: SlowSourceInfo[] = [
    {
        nameIntlID: "subject.eleven.q-slow",
        values: [Constants.Q.min_slow, Constants.Q.max_slow],
        valueLabels: ["buff-debuff.common.min", "buff-debuff.common.max"]
    }
];
