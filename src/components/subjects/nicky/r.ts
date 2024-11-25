import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1033500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.damage,
        1: Constants.R.airborne,
        2: Constants.R.enhanced_damage,
        10: Constants.R.damage.base,
        12: RatioPercent(Constants.R.damage.amp),
        13: Constants.R.enhanced_damage.base,
        15: RatioPercent(Constants.R.enhanced_damage.amp)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/TargetDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/FettedDamage", values: Constants.R.enhanced_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
