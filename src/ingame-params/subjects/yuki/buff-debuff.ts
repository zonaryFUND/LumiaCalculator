import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 襟正し(W) 発動中の自己被ダメージ減少は攻撃力に比例するレシオのため、calculateValue()で解決する
    const damageReduction = calculateValue(Constants.W.damage_reduction, status, config, "W");

    return {
        "subject.yuki.w-damage-reduction-buff": {
            origin: "skill",
            nameIntlID: "subject.yuki.w-damage-reduction-buff",
            maxStack: 1,
            buff: stack => ({
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1011310",
                    value: {
                        type: "constant",
                        value: damageReduction.static.toNumber() * stack
                    }
                }]
            })
        }
    };
};

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // 打ち落とし！(E) 的中対象への攻撃速度減少
    "subject.yuki.e-attack-speed-down": {
        origin: "skill",
        nameIntlID: "subject.yuki.e-attack-speed-down",
        maxStack: 1,
        buff: stack => ({
            attackSpeed: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1011400",
                value: {
                    type: "constant",
                    value: Constants.E.attack_speed_down.effect * -1 * stack
                }
            }]
        })
    }
};

// 面！(Qボタンなし)・R（切り裂き）の移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、
// ここでは「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.yuki.q-slow", values: [Constants.Q.slow.effect] },
    { nameIntlID: "subject.yuki.r-slow", values: [Constants.R.slow.effect] }
];
