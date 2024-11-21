import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1019300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.damage.base[skillLevel],
        2: Constants.W.duration,
        3: `${Constants.W.cooldown_reduction}%`,
        4: Constants.W.before_blast,
        5: `${Constants.W.damage.amp}%`,
        20: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
