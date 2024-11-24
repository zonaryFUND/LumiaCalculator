import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1038300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.first_damage.base,
        2: RatioPercent(Constants.W.slow.effect),
        3: Constants.W.second_damage.base,
        5: Constants.W.slow.duration,
        6: RatioPercent(Constants.W.first_damage.amp),
        7: RatioPercent(Constants.W.second_damage.amp),
        20: Constants.W.first_damage,
        21: Constants.W.second_damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.first_damage.base},
            {labelIntlID: "ToolTipType/ReactivateDamage", values: Constants.W.second_damage.base},
        ]  
    })
}
