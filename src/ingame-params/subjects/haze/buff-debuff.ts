import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // ロケットランチャー状態(R) 効果時間中の基本攻撃射程・攻撃速度固定、移動速度flat減少、視界増加
    "subject.haze.r-buff": {
        origin: "skill",
        nameIntlID: "subject.haze.r-buff",
        maxStack: 1,
        buff: stack => ({
            attackRange: [{
                origin: "temporary-status",
                calculationType: "fix",
                intlID: "CharacterState/Group/Name/1058530",
                value: {
                    type: "constant",
                    value: Constants.R.basic_attack_range * stack
                }
            }],
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "fix",
                intlID: "CharacterState/Group/Name/1058530",
                value: {
                    type: "constant",
                    value: Constants.R.attack_speed * stack
                }
            }],
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1058530",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed_penalty * -1 * stack
                }
            }],
            sightRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1058530",
                value: {
                    type: "constant",
                    value: Constants.R.vision * stack
                }
            }]
        })
    },
    // ウェポンケース(T) 銃取り出し後基本攻撃追加ダメージ発生時の自己移動速度増加
    "subject.haze.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.haze.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1058120",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// Q3（ロケットランチャー、加速ロケット）・R（切り替え時、ロケットランチャー振り回し）の移動速度減少は
// 汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとして
// のみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.haze.q3-slow", values: [Constants.Q3.slow.effect] },
    { nameIntlID: "subject.haze.r-slow", values: [Constants.R.slow.effect] }
];
