import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1045500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        6: Constants.R.supression,
        7: Constants.R.heal.base,
        12: RatioPercent(Constants.R.heal.amp),
        13: RatioPercent(Constants.R.heal.defense),
        21: Constants.R.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
