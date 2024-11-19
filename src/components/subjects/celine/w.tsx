import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1043300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: `${Constants.W.q_cooldown_reduction[skillLevel]}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/DecreaseCoolTime", values: Constants.W.q_cooldown_reduction, percent: true}
        ]  
    })
}
