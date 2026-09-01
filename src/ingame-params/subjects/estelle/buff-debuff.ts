import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { calculateValue } from "core/value-ratio";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config, status) => {
    // 被ダメージ減少がスキル増幅（ステータス）を参照するため、calculateValue()で解決する
    const damageReduction = calculateValue(Constants.E.damage_reduction, status, config, "E");

    return {
        // 盾防御(E) 展開中の被ダメージ減少・自己移動速度減少（同一バフ）
        "subject.estelle.e-buff": {
            origin: "skill",
            nameIntlID: "subject.estelle.e-buff",
            maxStack: 1,
            buff: stack => ({
                preventDamageRatio: [{
                    origin: "temporary-status",
                    calculationType: "sum",
                    intlID: "CharacterState/Group/Name/1055410",
                    value: {
                        type: "constant",
                        value: damageReduction.static.toNumber() * stack
                    }
                }],
                moveSpeed: [{
                    origin: "temporary-status",
                    calculationType: "mul",
                    intlID: "CharacterState/Group/Name/1055410",
                    value: {
                        type: "constant",
                        value: Constants.E["self-slow"] * -1 * stack
                    }
                }]
            })
        }
    };
};

// W（先制対応）・EW（緊急鎮火）・R自分使用時（ヘリ支援要請）の移動速度減少は汎用デバフ（buff-debuff/
// generic-slow.ts）に一本化するため、ここでは「辞書」表示専用の参照データとしてのみ宣言する。
// givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.estelle.w-slow", values: [Constants.W.slow.effect] },
    { nameIntlID: "subject.estelle.w2-slow", values: [Constants.W2.slow_max] },
    { nameIntlID: "subject.estelle.r-slow", values: [Constants.R.self.slow.effect] }
];
