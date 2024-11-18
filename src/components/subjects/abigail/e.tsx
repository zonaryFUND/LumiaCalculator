import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1067400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel }) => {
        return {
            0: Constants.E.damage.base[skillLevel],
            1: `${Constants.E.damage.amp}%`,
            20: Constants.E.damage,
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
