import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1072400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.slow.duration,
        1: `${Constants.E.slow.effect[skillLevel]}%`,
        2: Constants.E.movement_speed.duration,
        3: `${Constants.E.movement_speed.effect}%`,
        4: Constants.E.damage.base[skillLevel],
        5: `${Constants.E.damage.attack}%`,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.E.slow.effect, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
        ]  
    })
}
