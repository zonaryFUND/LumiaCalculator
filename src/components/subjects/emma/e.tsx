import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";

export const code = 1019400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ skillLevel, showEquation }) => ({
        0: Constants.E.morph[skillLevel],
        2: Constants.E.movement_speed,
        3: `${Constants.E.heal[skillLevel]}%`,
        4: Constants.E.damage.base[skillLevel],
        5: `${Constants.E.damage.amp}%`,
        20: Constants.E.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.E.damage.base},
            {labelIntlID: "ToolTipType/StaminaCostRatio", values: Constants.E.heal},
            {labelIntlID: "ToolTipType/Time", values: Constants.E.morph}
        ]  
    })
}
