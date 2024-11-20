import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1065500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: showEquation ? Constants.R.damage.base[skillLevel] : Constants.R.damage,
        1: showEquation ? `${Constants.R.damage.additionalAttack}%` : Constants.R.second_damage,
        2: Constants.R.second_damage_count,
        3: Constants.R.second_damage.base[skillLevel],
        4: `${Constants.R.second_damage.additionalAttack}%`,
        6: Constants.R.second_damage_count
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
