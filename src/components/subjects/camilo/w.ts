import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1039300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => ({
        0: Constants.W.count,
        1: showEquation ? Constants.W.damage.base : Constants.W.damage,
        2: RatioPercent(Constants.W.damage.attack)
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
        ]  
    })
}
