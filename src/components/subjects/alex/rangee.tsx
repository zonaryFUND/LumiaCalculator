import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1027400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.RangeE.sp_cost
    },
    cooldown: Constants.RangeE.cooldown,
    values: ({ skillLevel }) => ({
        0: Constants.RangeE.damage.base[skillLevel],
        1: `${Constants.RangeE.damage.attack}%`,
        2: Constants.RangeE.slow.duration,
        3: `${Constants.RangeE.slow.effect[skillLevel]}%`,
        4: `${Constants.common.e_as[skillLevel]}%`,
        6: Constants.RangeE.weapon_swap,
        7: 6,
        20: Constants.RangeW.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.RangeW.damage.base},
            {labelIntlID: "ToolTipType/AddAttackSpeedRatio", values: Constants.common.e_as, percent: true},
            {labelIntlID: "ToolTipType/DecreaseMoveRatio", values: Constants.RangeE.slow.effect, percent: true},
        ]  
    })
}
