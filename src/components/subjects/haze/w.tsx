import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1058300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.damage,
        1: Constants.W.stun,
        2: `${Constants.W.er_cooldown_reduction}%`,
        20: Constants.W.damage.base[skillLevel],
        22: `${Constants.W.damage.amp}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
