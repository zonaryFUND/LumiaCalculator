import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = () => ({
    // 五大明王の陣(R) 召喚中の自己移動速度減少
    "subject.hyejin.r-slow": {
        origin: "skill",
        nameIntlID: "subject.hyejin.r-slow",
        maxStack: 1,
        buff: stack => ({
            moveSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1012500",
                value: {
                    type: "constant",
                    value: Constants.R.movement_speed_penalty * -1 * stack
                }
            }]
        })
    }
});

// W（吸霊符）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.hyejin.w-slow", values: [Constants.W.slow] }
];
