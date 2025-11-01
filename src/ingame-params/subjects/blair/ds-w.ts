import Constants from "./constants.json";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1084300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.DualSwordsW.cooldown,
    consumption: {
        type: "vp",
        value: Constants.DualSwordsW.vp_cost
    },
    values: ({ showEquation }): TooltipValues => {
        if (showEquation) {
            return {
                0: Constants.DualSwordsW.damage.base,
                1: RatioPercent(Constants.DualSwordsW.damage.additionalAttack),
                2: RatioPercent(Constants.DualSwordsW.first_hit_enhancement),
                3: Constants.DualSwordsW.defense_down.duration,
                4: RatioPercent(Constants.DualSwordsW.defense_down.effect)
            }
        } else {
            return {
                0: Constants.DualSwordsW.damage,
                1: RatioPercent(Constants.DualSwordsW.first_hit_enhancement),
                2: Constants.DualSwordsW.defense_down.duration,
                3: RatioPercent(Constants.DualSwordsW.defense_down.effect)
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.DualSwordsW.damage.base},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.DualSwordsW.defense_down.effect, percent: true}
        ]  
    })
}
