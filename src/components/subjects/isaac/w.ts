import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1059300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base,
                1: RatioPercent(Constants.W.damage.attack),
                3: RatioPercent(Constants.W.cooldown_reduction)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: RatioPercent(Constants.W.cooldown_reduction)
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}
