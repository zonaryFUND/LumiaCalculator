import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";
import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { SubjectSelfBuffDebuff } from "../type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 虚勢(W) 防御力増加量は自身の（このバフ適用前の）防御力にも依存するため、statusForSelfBuffs
    // （自己バフ適用前のStatus）から算出する
    const wDefenseBuff = Constants.W.defense.base[config.skillLevels.W] +
        status.defense.calculatedValue.div(Constants.W.defense.defense).floor().toNumber();

    return {
        // 足踏み(Q) 敵にスキル的中時の自己移動速度増加
        "subject.hyunwoo.q-movement-speed": {
            origin: "skill",
            nameIntlID: "subject.hyunwoo.q-movement-speed",
            maxStack: 1,
            buff: stack => ({
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1007210",
                    value: {
                        type: "constant",
                        value: Constants.Q.movement_speed.effect[config.skillLevels.Q] * stack
                    }
                }]
            })
        },
        // 虚勢(W) 自己防御力増加
        "subject.hyunwoo.w-defense-buff": {
            origin: "skill",
            nameIntlID: "subject.hyunwoo.w-defense-buff",
            maxStack: 1,
            buff: stack => ({
                defense: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1007310",
                    value: {
                        type: "constant",
                        value: wDefenseBuff * stack
                    }
                }]
            })
        }
    };
};

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // アトミックパンチ(R) 的中対象への防御力減少（Rレベル1-3に応じて10/15/20%）
    "subject.hyunwoo.r-defense-down": {
        origin: "skill",
        nameIntlID: "subject.hyunwoo.r-defense-down",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1007500",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.R.defense_down.effect[stack - 1] * -1
                }
            }]
        })
    }
};

// 足踏み(Q)の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.hyunwoo.q-slow", values: [Constants.Q.slow.effect] }
];
