import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1005500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.first_damage.base,
        1: Constants.R.second_damage.base,
        4: RatioPercent(Constants.R.first_damage.amp),
        5: RatioPercent(Constants.R.second_damage.amp),
        6: Constants.R.first_damage,
        7: Constants.R.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/DotDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
