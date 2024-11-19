import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1002500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.fear,
        1: showEquation ? Constants.R.damage.base[skillLevel] : Constants.R.damage,
        2: `${Constants.R.damage.attack}%`,
        3: `${Constants.R.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
        ]  
    })
}
