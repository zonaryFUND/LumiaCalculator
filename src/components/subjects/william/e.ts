import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1032400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.duration,
        1: Constants.E.defense
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/DefenseRatio", values: Constants.E.defense},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
