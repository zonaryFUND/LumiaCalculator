import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1003400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.damage.base[skillLevel],
        4: Constants.E.reuse,
        14: `${Constants.E.damage.amp}%`,
        15: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base}
        ]  
    })
}
