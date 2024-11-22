import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1047500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.max_additional_shield,
        1: Constants.R.first_damage.base[skillLevel],
        2: `${Constants.R.first_damage.amp}%`,
        3: Constants.R.shield.base[skillLevel],
        4: `${Constants.R.shield.amp}%`,
        5: Constants.R.second_damage.base[skillLevel],
        6: `${Constants.R.second_damage.amp}%`,
        7: Constants.R.additional_shield.base[skillLevel],
        8: `${Constants.R.additional_shield.amp}%`,
        11: Constants.R.shield_duration,
        20: Constants.R.first_damage,
        21: Constants.R.shield,
        22: Constants.R.second_damage,
        23: Constants.R.additional_shield,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/Shield", values: Constants.R.shield.base},
            {labelIntlID: "ToolTipType/AdditionalShield", values: Constants.R.additional_shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
