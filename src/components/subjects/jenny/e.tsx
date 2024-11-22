import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1038400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.damage.base[skillLevel],
        1: `${Constants.E.damage.amp}%`,
        2: Constants.E.count,
        3: Constants.E.cooldown_reduction,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown.constant},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.E.damage.base},
        ]  
    })
}
