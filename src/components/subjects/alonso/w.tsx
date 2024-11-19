import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1068300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.duration,
        1: `${Constants.W.damage_reduction}%`,
        2: Constants.W.waves,
        3: Constants.W.damage,
        4: Constants.W.final_damage,
        10: Constants.W.damage.base[skillLevel],
        11: `${Constants.W.damage.amp}%`,
        12: `${Constants.W.damage.additionalMaxHP}%`,
        13: Constants.W.final_damage.base[skillLevel],
        14: `${Constants.W.final_damage.amp}%`,
        15: `${Constants.W.final_damage.additionalMaxHP}%`
    }),
    expansion: () => ({
        tipValues: {
            0: `${Constants.W.self_slow}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AlonsoActive2ProjectileDamage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/AlonsoActive2FinishDamage", values: Constants.W.final_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
