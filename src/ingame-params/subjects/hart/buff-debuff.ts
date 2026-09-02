import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // Overdrive(W) 自己攻撃力増加・基本攻撃射程増加（同一バフ）
    "subject.hart.w-buff": {
        origin: "skill",
        nameIntlID: "subject.hart.w-buff",
        maxStack: 1,
        buff: stack => ({
            attackPower: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1008300",
                value: {
                    type: "constant",
                    value: Constants.W.attack[config.skillLevels.W] * stack
                }
            }],
            attackRange: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1008300",
                value: {
                    type: "constant",
                    value: Constants.W.range * stack
                }
            }]
        })
    }
});

// Q（Delay）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.hart.q-slow", values: [Constants.Q.slow.effect] }
];
