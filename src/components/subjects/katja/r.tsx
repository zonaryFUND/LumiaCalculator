import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1072500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.first_damage.base[skillLevel],
        1: `${Constants.R.first_damage.attack}%`,
        2: 3,
        4: Constants.R.second_damage.base[skillLevel],
        5: `${Constants.R.second_damage.attack}%`,
        6: Constants.R.third_damage.base[skillLevel],
        7: `${Constants.R.third_damage.attack}%`,
        20: Constants.R.first_damage,
        21: Constants.R.second_damage,
        22: Constants.R.third_damage,
    }),
    expansion: () => ({
        tipValues: {
            0: 3,
            2: `${Constants.R.cooldown_return}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/ThirdDamage", values: Constants.R.third_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
