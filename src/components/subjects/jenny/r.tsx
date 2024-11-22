import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1038500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.R.slow[skillLevel]}%`,
        1: Constants.R.duration,
        2: Constants.R.damage.base[skillLevel],
        4: Constants.R.charm,
        6: `${Constants.R.damage.amp}%`,
        20: Constants.R.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.R.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.R.slow, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
