import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1008300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.duration[skillLevel],
        1: Constants.W.attack[skillLevel],
        8: Constants.W.range
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackPower", values: Constants.W.attack},
            {labelIntlID: "ToolTipType/MoveSpeedDowTime", values: Constants.W.duration},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
