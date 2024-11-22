import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1047300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.slow.duration,
        1: `${Constants.W.slow.effect[skillLevel]}%`,
        2: Constants.W.target_duration,
        3: Constants.W.damage.base[skillLevel],
        4: `${Constants.W.damage.amp}%`,
        5: Constants.W.heal.base[skillLevel],
        6: `${Constants.W.heal.amp}%`,
        20: Constants.W.damage,
        21: Constants.W.heal
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Heal", values: Constants.W.heal.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.W.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
