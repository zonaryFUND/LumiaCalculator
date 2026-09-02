import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 狩りの始まり(E) 自己移動速度増加
    "subject.fenrir.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.fenrir.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1086400",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // 狩りの始まり(E) 敵実験体へ向かって移動するときの追加自己移動速度増加（別バフとして表現）
    "subject.fenrir.e-additional-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.fenrir.e-additional-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1086400",
                value: {
                    type: "constant",
                    value: Constants.E.additional_movement_speed[config.skillLevels.E] * stack
                }
            }]
        })
    },
    // 最後の足掻き状態(T) 不死身状態中の自己攻撃速度増加・移動速度増加
    "subject.fenrir.t-buff": {
        origin: "skill",
        nameIntlID: "subject.fenrir.t-buff",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1086120",
                value: {
                    type: "constant",
                    value: Constants.T.last_ditch.attack_speed * stack
                }
            }],
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1086120",
                value: {
                    type: "constant",
                    value: Constants.T.last_ditch.movement_speed * stack
                }
            }]
        })
    },
    // 最後の足掻き状態(T) 不死身状態中に攻撃を受けたことによる自己移動速度減少（最大10スタック＝被攻撃回数）。
    // 「不死身状態だがまだ攻撃を受けていない」を表現できるよう、上記の攻撃速度・移動速度増加バフとは
    // 独立した項目として扱う
    "subject.fenrir.t-slow": {
        origin: "skill",
        nameIntlID: "subject.fenrir.t-slow",
        maxStack: Constants.T.last_ditch.penalty_max_stack,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1086180",
                value: {
                    type: "constant",
                    value: Constants.T.last_ditch.movement_speed_penalty.effect * -1 * stack
                }
            }]
        })
    }
});

// Q（鋭い爪、強化時）・R（とどめ刺し）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.fenrir.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.fenrir.r-slow", values: [Constants.R.slow.effect] }
];
