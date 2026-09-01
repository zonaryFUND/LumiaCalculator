import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // スイープキック(W) 実行中の自己移動速度増加・被ダメージ減少（同一バフ）
    "subject.craver.w-buff": {
        origin: "skill",
        nameIntlID: "subject.craver.w-buff",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1089310",
                value: {
                    type: "constant",
                    value: Constants.W.movement_speed * stack
                }
            }],
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1089310",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction * stack
                }
            }]
        })
    }
});

// Q（フォーカスショット）・W（スイープキック）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.craver.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.craver.w-slow", values: [Constants.W.slow.effect] }
];
