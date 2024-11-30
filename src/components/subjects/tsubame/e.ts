import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1070400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        1: Constants.E.duration,
        2: Constants.E.reuse
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown}
        ]  
    })
}
