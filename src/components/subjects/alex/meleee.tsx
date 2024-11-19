import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1027800;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.MeleeE.sp_cost
    },
    cooldown: Constants.MeleeE.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.MeleeE.duration,
        1: `${Constants.common.e_as[skillLevel]}%`,
        2: Constants.MeleeE.taunt,
        3: 2,
        5: Constants.MeleeE.weapon_swap,
        6: 6,
        20: Constants.MeleeW.damage,
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "StatType/AttackSpeed", values: Constants.common.e_as, percent: true},
            {labelIntlID: "ToolTipType/Cost", values: Constants.MeleeE.sp_cost},
        ]  
    })
}
