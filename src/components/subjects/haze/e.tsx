import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1058400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.ammo,
        1: Constants.E.damage.base[skillLevel],
        5: Constants.E.effect_count,
        6: `${Constants.E.max_cooldown_reduction}%`,
        8: Constants.E.duration,
        20: Constants.E.damage.base[skillLevel],
        22: Constants.E.damage.amp_per
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.E.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.E.sp_cost}
        ]  
    })
}
