import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // マグネチックハンド(Q) 対象を向いているときの移動速度増加（最大値のみ実装）
    "subject.alonso.q-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.alonso.q-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1068200",
                value: {
                    type: "constant",
                    value: Constants.Q.near_movement_speed[config.skillLevels.Q] * stack
                }
            }]
        })
    },
    // バウンシングシールド(W) 前方からの被ダメージ減少（ダメージタイプ非依存）
    "subject.alonso.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.alonso.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1068300",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction * stack
                }
            }]
        })
    }
});

// Rの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.alonso.r-slow", values: [Constants.R.slow] }
];
