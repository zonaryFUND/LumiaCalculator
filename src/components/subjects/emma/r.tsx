import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1019500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.R.Q.damage.base[skillLevel],
        2: Constants.R.W.damage.base[skillLevel],
        4: Constants.R.Q.bind,
        5: Constants.R.E.morph,
        7: Constants.R.E.movement_speed,
        10: `${Constants.R.Q.damage.amp}%`,
        11: `${Constants.R.W.damage.amp}%`,
        12: `${Constants.R.E.damage.amp}%`,
        13: `${Constants.R.E.damage.base[skillLevel]}`,
        20: Constants.R.Q.damage,
        21: Constants.R.W.damage,
        22: Constants.R.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/PigeonDamage", values: Constants.R.Q.damage.base},
            {labelIntlID: "ToolTipType/HatDamage", values: Constants.R.W.damage.base},
            {labelIntlID: "ToolTipType/RabbitDamage", values: Constants.R.E.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown}
        ]  
    })
}
