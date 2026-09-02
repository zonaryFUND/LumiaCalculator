import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // タイムリープ(E) W範囲内で敵にダメージを与えたときの自己移動速度増加
    "subject.henry.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.henry.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1083400",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect * stack
                }
            }]
        })
    }
});

// W（時の歯車）・R（時間再構築）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.henry.w-slow", values: [Constants.W.slow] },
    { nameIntlID: "subject.henry.r-slow", values: [Constants.R.slow] }
];
