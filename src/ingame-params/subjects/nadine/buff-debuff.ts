import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 猿ワイヤー(E) 再使用後の自己攻撃速度増加はスキル増幅に比例するレシオのため、calculateValue()で解決する
    const eAttackSpeed = calculateValue(Constants.E.attack_speed, status, config, "E");

    return {
        // ブルズアイ(Q) チャージ中の自己移動速度減少
        "subject.nadine.q-self-slow": {
            origin: "skill",
            nameIntlID: "subject.nadine.q-self-slow",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1006200",
                    value: {
                        type: "constant",
                        value: Constants.Q.movement_speed_penalty * -1 * stack
                    }
                }]
            })
        },
        // 猿ワイヤー(E) 再使用後の自己攻撃速度増加
        "subject.nadine.e-attack-speed": {
            origin: "skill",
            nameIntlID: "subject.nadine.e-attack-speed",
            maxStack: 1,
            buff: stack => ({
                attackSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1006400",
                    value: {
                        type: "constant",
                        value: eAttackSpeed.static.toNumber() * stack
                    }
                }]
            })
        }
    };
};

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // リス罠(W) 的中対象への攻撃速度減少
    "subject.nadine.w-attack-speed-down": {
        origin: "skill",
        nameIntlID: "subject.nadine.w-attack-speed-down",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1006300",
                value: {
                    type: "constant",
                    value: Constants.W.attack_speed * -1 * stack
                }
            }]
        })
    },
    // 狼猛襲(R) 的中対象への攻撃速度減少
    "subject.nadine.r-attack-speed-down": {
        origin: "skill",
        nameIntlID: "subject.nadine.r-attack-speed-down",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1006510",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed * -1 * stack
                }
            }]
        })
    }
};

// リス罠(W)・狼猛襲(R)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない。攻撃速度減少は
// 汎用デバフの対象外のため、それぞれ固有デバフ（givenBuffDebuff）として上に個別実装する
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.nadine.w-slow", values: Constants.W.movement_speed, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.nadine.r-slow", values: [Constants.R.movement_speed] }
];
