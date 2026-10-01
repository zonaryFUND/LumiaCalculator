import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // E 自身に使用したときの移動速度増加
    // CharacterStateのローカライズIDがAPIから取得できるようになるまでは、intlIDにも独自キーを使う
    "subject.seres.e-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.seres.e-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "subject.seres.e-movement-speed",
                value: {
                    type: "constant",
                    value: Constants.E.movement_speed.effect * stack
                }
            }]
        })
    }
});

// Wの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.seres.w-slow", values: [Constants.W.slow.effect] }
];
