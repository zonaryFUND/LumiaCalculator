import Constants from "./constants.json";
import { SkillTooltipProps } from "@app/ingame-params/skill-tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1008500;

export const info: SkillTooltipProps = {
    skillKey: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.duration,
        2: Constants.R.heal,
        6: Constants.R.heal,
        7: RatioPercent(Constants.R.threshold),
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
