import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1054500;

export const info: TooltipInfo = {
    skill: "R",
    consumption: {
        type: "sp",
        value: Constants.R.sp_cost
    },
    cooldown: Constants.R.cooldown,
    values: ({ showEquation}) => {
        if (showEquation) {
            return {
                0: Constants.R.range,
                1: Constants.R.first_damage.base,
                2: RatioPercent(Constants.R.first_damage.amp),
                3: RatioPercent(Constants.R.slow),
                4: Constants.R.duration,
                5: Constants.R.second_damage.base,
                6: RatioPercent(Constants.R.second_damage.amp),
                7: Constants.R.stun,
                8: RatioPercent(Constants.R.first_damage.attack),
                9: RatioPercent(Constants.R.second_damage.attack)
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.R.range,
                1: Constants.R.first_damage,
                2: RatioPercent(Constants.R.slow),
                3: Constants.R.duration,
                4: Constants.R.second_damage,
                5: Constants.R.stun
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        enumeratedValues: [
            {labelIntlID: "ToolTipType/FirstDamage", values: Constants.R.first_damage.base},
            {labelIntlID: "ToolTipType/SecondDamage", values: Constants.R.second_damage.base},
            {labelIntlID: "ToolTipType/DecreaseMovespeed", values: Constants.R.slow, percent: true},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.R.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.R.sp_cost}
        ]  
    })
}
