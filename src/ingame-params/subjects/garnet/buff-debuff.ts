import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // 我慢(W) チャージ中の被ダメージ減少
    "subject.garnet.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.garnet.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1076320",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction.effect * stack
                }
            }]
        })
    },
    // 処刑式(R2)発動時の自己移動速度増加
    "subject.garnet.r-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.garnet.r-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1076570",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed.effect * stack
                }
            }]
        })
    }
});

// Q（押しつぶし）・W（我慢、発動時）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化する
// ため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.garnet.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.garnet.w-slow", values: [Constants.W.slow.effect] }
];
