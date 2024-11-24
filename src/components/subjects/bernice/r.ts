import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1025500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.R.max_spread : Constants.R.first_damage,
        1: showEquation ? Constants.R.first_damage.base : Constants.R.bind,
        2: showEquation ? RatioPercent(Constants.R.first_damage.attack) : Constants.R.second_damage,
        3: showEquation ? Constants.R.bind : `${Constants.R.spread_range}m`,
        4: showEquation ? Constants.R.second_damage.base : Constants.R.max_spread,
        5: RatioPercent(Constants.R.second_damage.attack),
        6: `${Constants.R.spread_range}m`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
