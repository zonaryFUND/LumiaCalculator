import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1036300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.W.first_damage.base[skillLevel],
        2: Constants.W.second_damage.base[skillLevel],
        4: Constants.W.duration,
        6: Constants.W.airborne,
        8: `${Constants.W.slow}%`,
        9: Constants.W.vitalforce,
        10: `${Constants.W.first_damage.amp}%`,
        11: `${Constants.W.second_damage.amp}%`,
        20: Constants.W.first_damage,
        21: Constants.W.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.first_damage.base},
            {labelIntlID: "ToolTipType/AdditionalDamage", values: Constants.W.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
