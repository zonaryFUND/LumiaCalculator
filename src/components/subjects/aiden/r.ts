import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1046500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ }) => ({
        0: Constants.R.first_damage.base,
        1: RatioPercent(Constants.R.first_damage.attack),
        2: Constants.R.first_slow.duration,
        3: RatioPercent(Constants.R.first_slow.effect),
        4: Constants.R.center_damage.base,
        5: RatioPercent(Constants.R.center_damage.attack),
        6: Constants.R.stun,
        7: Constants.R.second_damage.base,
        8: RatioPercent(Constants.R.second_damage.attack),
        9: Constants.R.second_slow.duration,
        10: RatioPercent(Constants.R.second_slow.effect),
        20: Constants.R.first_damage,
        21: Constants.R.center_damage,
        22: Constants.R.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstThunderDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/FirstThunderInnerDamage", values: Constants.R.center_damage.base},
            {labelIntlID: "ToolTipType/SecondThunderDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
