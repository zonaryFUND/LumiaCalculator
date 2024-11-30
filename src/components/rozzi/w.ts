import Constants from "./constants.json";
import { TooltipInfo } from "../subjects/dictionary";
import { RatioPercent } from "../subjects/valueratio-to-string";

export const code = 1021300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ }) => ({
        0: Constants.W.damage.base,
        1: RatioPercent(Constants.W.damage.attack),
        2: RatioPercent(Constants.W.movement_speed),
        3: Constants.W.duration,
        4: RatioPercent(Constants.W.defense_down),
        5: RatioPercent(Constants.W.healing_reduction),
        7: Constants.W.cooldown_reduction,
        20: Constants.W.damage
    }),
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/DecreaseDefenseRatio", values: Constants.W.defense_down, percent: true}
        ]  
    })
}
