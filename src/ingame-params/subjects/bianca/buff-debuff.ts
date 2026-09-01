import Constants from "./constants";
import { SubjectSelfBuffDebuff } from "../type";
import { SlowSourceInfo } from "@app/ingame-params/buff-debuff/type";
import { CommonSkillLevelLabelsMax5 } from "@app/ingame-params/buff-debuff/util";

export const selfBuffDebuff: SubjectSelfBuffDebuff = (config) => ({
    // 短い安息(W) 棺の中にいる間の被ダメージ減少
    "subject.bianca.w-damage-reduction": {
        origin: "skill",
        nameIntlID: "subject.bianca.w-damage-reduction",
        maxStack: 1,
        buff: stack => ({
            preventDamageRatio: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1042310",
                value: {
                    type: "constant",
                    value: Constants.W.damage_reduction[config.skillLevels.W] * stack
                }
            }]
        })
    },
    // 真祖の君臨(R) 魔法陣の上にいる間のダメージ吸血増加
    "subject.bianca.r-omnisyphon": {
        origin: "skill",
        nameIntlID: "subject.bianca.r-omnisyphon",
        maxStack: 1,
        buff: stack => ({
            lifeSteal: [{
                origin: "temporary-status",
                calculationType: "sum",
                intlID: "CharacterState/Group/Name/1042510",
                value: {
                    type: "constant",
                    value: Constants.R.omnisyphon_amp[config.skillLevels.R] * stack
                }
            }]
        })
    }
});

// R1発目・Tの移動速度減少は汎用デバフ（buff-debuff/generic-slow.ts）に一本化するため、ここでは「辞書」表示
// 専用の参照データとしてのみ宣言する。givenBuffDebuffには個別登録しない
export const slowSources: SlowSourceInfo[] = [
    { nameIntlID: "subject.bianca.r-slow", values: [Constants.R.slow.effect] },
    { nameIntlID: "subject.bianca.t-slow", values: Constants.T.slow.effect, valueLabels: CommonSkillLevelLabelsMax5.slice(1, 4) }
];
