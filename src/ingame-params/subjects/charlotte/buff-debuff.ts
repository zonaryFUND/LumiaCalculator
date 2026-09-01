import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 高潔な心(T) 与える回復・シールド効果増加（最大3スタック）
    "subject.charlotte.t-heal-shield-amp": {
        origin: "skill",
        nameIntlID: "subject.charlotte.t-heal-shield-amp",
        maxStack: Constants.T.max_stack,
        buff: stack => ({
            healerGiveHealShieldRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1073100",
                value: {
                    type: "constant",
                    value: Constants.T.heal_and_shield_amp[config.skillLevels.T] * stack
                }
            }]
        })
    }
});

// Qの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の
// 参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.charlotte.q-slow", values: [Constants.Q.slow.effect] }
];
