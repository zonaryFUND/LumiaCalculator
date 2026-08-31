import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => ({
    // E1（バックステップ）使用後の自己移動速度増加
    "subject.aiden.e-backstep-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.aiden.e-backstep-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1046420",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // Tハイパーチャージ状態終了時の自己移動速度増加
    "subject.aiden.t-hypercharge-end-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.aiden.t-hypercharge-end-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1046130",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    },
    // Tハイパーチャージ状態発動中の自己デバフ（攻撃速度減少、レベル非依存の固定値）
    "subject.aiden.t-hypercharge-attack-speed": {
        origin: "skill",
        nameIntlID: "subject.aiden.t-hypercharge-attack-speed",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1046100",
                value: {
                    type: "constant",
                    value: Constants.T.attack_speed * -1 * stack
                }
            }]
        })
    }
});

// Q（電磁砲、ハイパーチャージ中）・W・R1・R2の移動速度減少は汎用デバフ（generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.aiden.q-hypercharge-slow", values: Constants.Q.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1) },
    { nameIntlID: "subject.aiden.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.aiden.r1-slow", values: [Constants.R.first_slow.effect] },
    { nameIntlID: "subject.aiden.r2-slow", values: [Constants.R.second_slow.effect] }
];
