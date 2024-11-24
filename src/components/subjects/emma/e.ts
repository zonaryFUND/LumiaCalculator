import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1019400;

export const info: TooltipInfo = {
    skill: "E",
    consumption: {
        type: "sp",
        value: Constants.E.sp_cost
    },
    cooldown: Constants.E.cooldown,
    values: ({ }) => ({
        0: Constants.E.morph,
        2: Constants.E.movement_speed,
        3: RatioPercent(Constants.E.heal),
        4: Constants.E.damage.base,
        5: RatioPercent(Constants.E.damage.amp),
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
