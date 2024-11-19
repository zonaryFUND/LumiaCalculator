import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1068400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.damage,
        1: Constants.E.bind[skillLevel],
        10: Constants.E.damage.base[skillLevel],
        11: `${Constants.E.damage.defense}%`,
        12: `${Constants.E.damage.maxHP}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/FetterTime", values: Constants.E.bind},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
