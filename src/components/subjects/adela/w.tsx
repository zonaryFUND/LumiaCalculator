import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1024300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.W.damage.base[skillLevel],
        2: Constants.W.pawn_queen.airborne,
        3: Constants.W.rook.airborne,
        4: Constants.W.duration,
        5: `${Constants.W.pawn_queen.damage}%`,
        6: `${Constants.W.damage.amp}%`,
        20: Constants.W.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost}
        ]  
    })
}
