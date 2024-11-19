import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1027500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.R.first_damage.outer.base[skillLevel],
        1: `${Constants.R.first_damage.outer.attack}%`,
        2: Constants.R.first_damage.center.base[skillLevel],
        3: `${Constants.R.first_damage.center.attack}%`,
        4: Constants.R.later_damage.tick,
        5: Constants.R.later_damage.amount,
        6: Constants.R.later_damage.outer.base[skillLevel],
        7: `${Constants.R.later_damage.outer.attack}%`,
        8: Constants.R.later_damage.center.base[skillLevel],
        9: `${Constants.R.later_damage.center.attack}%`,
        10: Constants.R.first_slow.duration,
        11: `${Constants.R.first_slow.effect}%`,
        12: Constants.R.later_slow.duration,
        13: `${Constants.R.later_slow.effect}`,
        20: Constants.R.first_damage.outer,
        21: Constants.R.first_damage.center,
        22: Constants.R.later_damage.outer,
        23: Constants.R.later_damage.center
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstOutDamage", values: Constants.R.first_damage.outer.base},
            {labelIntlID: "ToolTipType/FirstInnerDamage", values: Constants.R.first_damage.center.base},
            {labelIntlID: "ToolTipType/KeepOutDamage", values: Constants.R.later_damage.outer.base},
            {labelIntlID: "ToolTipType/KeepInnerDamage", values: Constants.R.later_damage.center.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
