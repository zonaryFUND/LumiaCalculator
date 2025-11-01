import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084400;

export const info: SkillTooltipProps = {
    skillKey: "E",
    cooldown: Constants.DualSwordsE.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DualSwordsE.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.DualSwordsE.damage.base,
                1: RatioPercent(Constants.DualSwordsE.damage.additionalAttack),
                2: RatioPercent(Constants.DualSwordsE.slow.effect),
                3: Constants.DualSwordsE.slow.duration,
                4: RatioPercent(Constants.DualSwordsE.combo_slow.effect),
                5: Constants.DualSwordsE.combo_slow.duration
            }        } else {
            return {
                0: Constants.DualSwordsE.damage,
                1: RatioPercent(Constants.DualSwordsE.slow.effect),
                2: Constants.DualSwordsE.slow.duration,
                3: RatioPercent(Constants.DualSwordsE.combo_slow.effect),
                4: Constants.DualSwordsE.combo_slow.duration
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DualSwordsE.damage.base},
            {labelIntlID: "ToolTipType/AddtionalApCoef", values: Constants.DualSwordsE.damage.additionalAttack, percent: true}
        ]  
    })
}
