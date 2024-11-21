import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1030200;

export const info: TooltipInfo = {
    skill: "Q",
    consumption: {
        type: "sp",
        value: Constants.Q.sp_cost
    },
    cooldown: Constants.Q.cooldown,
    values: ({ skillLevel, showEquation }) => {
        const base = {
            0: `${Constants.common.charging_slow_penalty}%`
        }
        if (showEquation) {
            return {
                ...base,
                1: Constants.Q.min_damage.base[skillLevel],
                2: `${Constants.Q.min_damage.attack}%`,
                3: `${Constants.Q.min_damage.additionalMaxHP}%`,
                4: Constants.Q.max_damage.base[skillLevel],
                5: `${Constants.Q.max_damage.attack}%`,
                6: `${Constants.Q.max_damage.additionalMaxHP}%`,
                7: Constants.Q.slow_duration,
                8: `${Constants.Q.min_slow}%`,
                9: `${Constants.Q.max_slow}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                ...base,
                1: Constants.Q.min_damage,
                2: Constants.Q.max_damage,
                3: Constants.Q.slow_duration,
                4: `${Constants.Q.min_slow}%`,
                5: `${Constants.Q.max_slow}%`
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.common.return_cooldown}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/MinDamage", values: Constants.Q.min_damage.base},
            {labelIntlID: "ToolTipType/MaxDamage", values: Constants.Q.max_damage.base},
            {labelIntlID: "ToolTipType/CoolTime", values: Constants.Q.cooldown},
            {labelIntlID: "ToolTipType/Cost", values: Constants.Q.sp_cost}
        ]  
    })
}
