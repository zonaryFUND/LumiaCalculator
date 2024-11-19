import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1073500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.channeling,
        1: Constants.R.duration,
        2: Constants.R.amp[skillLevel]
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/ApDamage", values: Constants.R.amp}
        ]  
    })
}
