import Constants from "./constants";
import { BuffDebuffDefinition, SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const givenBuffDebuff: Record<string, BuffDebuffDefinition> = {
    // T（火傷状態）による対象防御力低下（%、発生源のTレベル1-3に応じて6/8/10）
    "subject.adriana.t-defense-reduction": {
        origin: "skill",
        nameIntlID: "subject.adriana.t-defense-reduction",
        maxStack: 3,
        stackLabels: CommonSkillLevelLabelsMax5.slice(0, 4),
        buff: stack => ({
            defense: [{
                origin: "temporary-status",
                calculationType: "mul",
                intlID: "CharacterState/Group/Name/1017110",
                value: {
                    type: "constant",
                    value: stack == 0 ? 0 : Constants.T.defense_reduction[stack - 1] * -1
                }
            }]
        })
    }
};

// W（オイル地帯）・E（火炎地帯）の移動速度減少は汎用デバフ（generic-slow.ts）に一本化するため、ここでは
// 「辞書」表示専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.adriana.w-oil-slow", values: [Constants.W.slow] },
    { nameIntlID: "subject.adriana.e-flame-slow", values: [Constants.E.slow] }
];
