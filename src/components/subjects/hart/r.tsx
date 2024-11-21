import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1008500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.duration,
        2: Constants.R.heal,
        6: Constants.R.heal,
        7: `${Constants.R.threshold}%`,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Heal", values: Constants.R.heal.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost},
        ]  
    })
}
