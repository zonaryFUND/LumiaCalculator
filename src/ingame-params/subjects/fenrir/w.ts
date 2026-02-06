import Constants from "./constants";
import { SkillTooltipProps, TooltipValues } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1086300;

export const info: SkillTooltipProps = {
    skillKey: "W",
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }): TooltipValues => {
        const base: TooltipValues = {
            2: Constants.W.untargettable,
            3: RatioPercent(Constants.W.e_cooldown_reduction),
            4: Constants.W.reuse_time
        }

        if (showEquation) {
            return {
                ...base,
                0: RatioPercent(Constants.W.damage.attack),
                1: RatioPercent(Constants.W.second_damage.attack),
                20: Constants.W.damage.base,
                21: Constants.W.second_damage.base
            }
        } else {
            return {
                ...base,
                20: Constants.W.damage,
                21: Constants.W.second_damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FenrirW1_Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/FenrirW2_Damage", values: Constants.W.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
