import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1024400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.E.damage.base[skillLevel],
        2: Constants.E.knight.slow.duration,
        3: `${Constants.E.knight.slow.effect}%`,
        4: Constants.E.reuse,
        5: Constants.E.duration,
        6: `${Constants.E.pawn_queen}%`,
        7: `${Constants.E.damage.amp}%`,
        20: Constants.E.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
