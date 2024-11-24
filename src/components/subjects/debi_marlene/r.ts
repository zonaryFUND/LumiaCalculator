import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1065500;

export const info: TooltipInfo = {
    skill: "R",
    cooldown: Constants.R.cooldown,
    values: ({ showEquation }) => ({
        0: showEquation ? Constants.R.damage.base : Constants.R.damage,
        1: showEquation ? RatioPercent(Constants.R.damage.additionalAttack) : Constants.R.second_damage,
        2: Constants.R.second_damage_count,
        3: Constants.R.second_damage.base,
        4: RatioPercent(Constants.R.second_damage.additionalAttack),
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
