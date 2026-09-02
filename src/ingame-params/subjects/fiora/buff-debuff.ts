import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // トゥシェ(T) 刻印消化時の自己移動速度増加
    "subject.fiora.t-movement-speed": {
        origin: "skill",
        nameIntlID: "subject.fiora.t-movement-speed",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1003100",
                value: {
                    type: "constant",
                    value: Constants.T.movement_speed.effect[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// Q（ファント、先端ヒット時）・R（フレッシュ）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に
// 一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.fiora.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.fiora.r-slow", values: [Constants.R.slow.effect] }
];
