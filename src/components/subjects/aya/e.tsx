import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1002400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.E.cooldown_reduction[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/AyaActive3", values: Constants.E.cooldown_reduction, percent: true},
        ]  
    })
}
