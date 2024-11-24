import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";
import { calculateValue } from "app-types/value-ratio/calculation";
import { RatioPercent } from "../valueratio-to-string";

export const code = 1071300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ showEquation }) => {
        const base = {
            0: Constants.W.duration
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.W.damage_reduction.base,
                2: RatioPercent(Constants.W.damage_reduction.attack),
                3: Constants.W.shield_duration,
                4: Constants.W.shield.base,
                5: RatioPercent(Constants.W.shield.attack),
                6: Constants.W.extend
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: RatioPercent(Constants.W.damage_reduction),
                2: Constants.W.shield_duration,
                3: Constants.W.shield,
                4: Constants.W.extend
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: Constants.W.max_duration
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/SkillApCoef", values: Constants.W.damage_reduction.attack, percent: true},
            {labelIntlID: "ToolTipType/Shield", values: Constants.W.shield.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.W.cooldown},
        ]  
    })
}