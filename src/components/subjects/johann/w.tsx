import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1041300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.duration,
        1: `${Constants.W.slow}%`,
        2: `${Constants.W.attack_speed[skillLevel]}%`,
        3: Constants.W.effect_remain,
        4: `${Constants.W.cooldown_reduction}%`,
        7: `${Constants.W.mastery_addition}%`
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/AttackSpeedUpRatio", values: Constants.W.attack_speed, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
