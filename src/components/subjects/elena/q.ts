import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1050200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ showEquation }) => {
        if (showEquation) {
            return {
                0: Constants.Q.first_damage.base,
                1: RatioPercent(Constants.Q.first_damage.defense),
                3: Constants.Q.second_damage.base,
                4: RatioPercent(Constants.Q.second_damage.defense),
                6: Constants.Q.cooldown_reduction,
                7: RatioPercent(Constants.Q.first_damage.amp),
                8: RatioPercent(Constants.Q.second_damage.amp)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.Q.first_damage,
                1: Constants.Q.second_damage,
                6: Constants.Q.cooldown_reduction
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.Q.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.Q.second_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
