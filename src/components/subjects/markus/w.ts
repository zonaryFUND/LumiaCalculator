import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1053300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            1: RatioPercent(Constants.W.damage.attack),
            2: Constants.W.airborne,
            4: Constants.W.r_combo_knockback,
            6: RatioPercent(Constants.W.damage.additionalMaxHP)
        }
        if (showEquation) {
            return {
                ...base,
                0: Constants.W.damage.base,
            }
        } else {
            return {
                ...base,
                0: Constants.W.damage,
            }
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/Cost", values: Constants.W.sp_cost},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown}
        ]  
    })
}
