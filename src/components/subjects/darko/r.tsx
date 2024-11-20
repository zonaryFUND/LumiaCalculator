import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1074500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.slow.duration,
        1: `${Constants.R.slow.effect}%`,
        2: `${Constants.R.damage.targetMaxHP}%`,
        3: Constants.R.damage.base[skillLevel],
        4: `${Constants.R.damage.attack}%`,
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
