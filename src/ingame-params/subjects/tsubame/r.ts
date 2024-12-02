import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1070500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: RatioPercent(Constants.R.max_multiplier),
            2: RatioPercent(Constants.R.max_multiplier_threshold),
            3: Constants.T.max_stack,
            4: RatioPercent(Constants.R.cooldown_reduction)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.R.damage.base,
                5: RatioPercent(Constants.R.damage.attack)
            }
        } else {
            return {
                ...base,
                0: Constants.R.damage
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown.constant}
        ]  
    })
}
