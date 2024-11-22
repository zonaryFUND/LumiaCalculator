import Constants from "./constants.json";
import { TooltipInfo } from "../dictionary";
import { ValueRatio } from "app-types/value-ratio";

export const code = 1054300;

export const info: TooltipInfo = {
    skill: "W",
    consumption: {
        type: "sp",
        value: Constants.W.sp_cost
    },
    cooldown: Constants.W.cooldown,
    values: ({ skillLevel, showEquation, status }) => {
        if (showEquation) {
            return {
                0: Constants.W.damage.base[skillLevel],
                1: `${Constants.W.damage.amp}%`,
                2: Constants.W.slow.duration,
                3: `${Constants.W.slow.effect}%`,
                4: Constants.W.gauge[skillLevel],
                5: Constants.W.e_cooldown_reduction[skillLevel],
                6: `${Constants.W.damage.attack}%`,
                7: `${status.criticalChance.calculatedValue.percent(Constants.W.damage.criticalChance).toString()}%`,
                8: `${Constants.W.damage.criticalChance}%`
            } as Record<number, number | string | ValueRatio>
        } else {
            return {
                0: Constants.W.damage,
                1: Constants.W.slow.duration,
                2: `${Constants.W.slow.effect}%`,
                3: Constants.W.gauge[skillLevel],
                4: Constants.W.e_cooldown_reduction[skillLevel]
            } as Record<number, number | string | ValueRatio>
        }
    },
    expansion: () => ({
        tipValues: {
            0: `${Constants.W.damage_reduction}%`,
            1: `${Constants.W.damage.criticalChance}%`
        },
        enumeratedValues: [
            {labelIntlID: "ToolTipType/Damage", values: Constants.W.damage.base},
            {labelIntlID: "ToolTipType/KarlaExtraPointModifyCoef", values: Constants.W.gauge},
            {labelIntlID: "ToolTipType/KarlaSkill03CooldownReduce", values: Constants.W.e_cooldown_reduction}
        ]  
    })
}
