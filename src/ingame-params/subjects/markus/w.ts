import Constants from "./constants.json";
import { TooltipProps } from "@app/ingame-params/tooltip-props";
import { RatioPercent } from "@app/ingame-params/valueratio-to-string";

export const code = 1053300;

export const info: TooltipProps = {
    skillKey: "W",
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
